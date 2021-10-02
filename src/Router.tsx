import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Router: React.FC<{
  pages: {
    path: string;
    file: string;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
  }[];
}> = ({ pages }) => {
  return (
    <React.Suspense fallback={<></>}>
      <BrowserRouter>
        <Switch>
          {pages.map((route) => (
            <Route
              path={route.path}
              component={route.component}
              key={route.path}
              exact
            />
          ))}
        </Switch>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default Router;
