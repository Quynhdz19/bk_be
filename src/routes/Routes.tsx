import loadable, { DefaultComponent } from "@loadable/component";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { useHistory } from "react-router-dom";
import { PATHS } from "src/constants/paths";
import { ExchangePageLoading, MarketPageLoading } from "src/pages/loadings";
import { PrivateRoute } from "./components/PrivateRoute";
import UploadPage from "src/pages/upload";
import { LoginRoute } from "./components/LoginRoute";

const LoadingByTemplate: React.FC = () => {
  const history = useHistory();

  if (history.location.pathname.includes(PATHS.default())) {
    return <ExchangePageLoading />;
  }
  return <MarketPageLoading />;
};

function loadableWFallback(
  loadFn: (props: {}) => Promise<DefaultComponent<{}>>
) {
  return loadable(loadFn, {
    fallback: <LoadingByTemplate />,
  });
}

const NotFound = loadableWFallback(() => import("./components/NotFound"));
const LoginPage = loadableWFallback(() => import("src/pages/login"));

const Routes: React.FC = () => {

  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to={PATHS.upload()} />} />
      <LoginRoute exact path={PATHS.login()} component={LoginPage} />
      <PrivateRoute exact path={PATHS.upload()} component={UploadPage} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
