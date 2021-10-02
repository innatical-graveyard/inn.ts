import { Plugin } from "vite";
import * as fsWalk from "@nodelib/fs.walk";
import util from "util";
import path from "path/posix";

export default (): Plugin => {
  return {
    name: "inn.ts",
    resolveId(id) {
      if (id === "inn:routes") {
        return "inn:routes";
      }
    },
    async load(id) {
      if (id === "inn:routes") {
        const paths = await util.promisify(fsWalk.walk)("pages");
        const pages = paths
          .filter(
            ({ path }) =>
              (path.slice(-4) === ".tsx" || path.slice(-4) === ".jsx") &&
              path !== "/pages/_app.tsx"
          )
          .map(({ path }) => ({
            path: path.slice(5).slice(0, -4),
            file: path,
          }))
          .map((page) => ({
            ...page,
            path: page.path.endsWith("index")
              ? page.path.slice(0, -5)
              : page.path,
          }));

        return `
        import React from 'react'
        import Router from '@innatical/inn.ts/router';

        const pages = [${pages.map(
          (page) =>
            `{path: ${JSON.stringify(page.path)}, file: ${JSON.stringify(
              page.file
            )}, component: React.lazy(() => import(${JSON.stringify(
              "./" + page.file
            )}))}`
        )}]
        
        export default () => React.createElement(Router, { pages })
        `;
      }
    },
    async configureServer({ watcher, moduleGraph, ws }) {
      const fullReload = () => {
        const module = moduleGraph.getModuleById("inn:routes");
        moduleGraph.getModuleById("inn:routes")?.importedModules;
        module && moduleGraph.invalidateModule(module);
      };

      watcher.add("./pages/*");
      watcher.on(
        "add",
        (file) => file.startsWith(path.resolve("./pages")) && fullReload()
      );
      watcher.on(
        "unlink",
        (file) => file.startsWith(path.resolve("./pages")) && fullReload()
      );
    },
  };
};
