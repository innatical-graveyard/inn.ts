import React from "react";
import { Route, Switch } from "react-router-dom";

const Router: React.FC<{
  pages: {
    path: string;
    file: string;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
  }[];
}> = ({ pages }) => {
  return (
    <React.Suspense fallback={<></>}>
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
    </React.Suspense>
  );
};

export default Router;
