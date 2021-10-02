import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

interface Page {
  path: string;
  file: string;
}

const Router = ({ pages }: { pages: Page[] }) => {
  return (
    <React.Suspense fallback={<></>}>
      <BrowserRouter>
        {pages.map((route) => (
          <Route
            path={route.path}
            component={React.lazy(() => import("./" + route.file))}
            key={route.path}
          />
        ))}
      </BrowserRouter>
    </React.Suspense>
  );
};

export default Router;
