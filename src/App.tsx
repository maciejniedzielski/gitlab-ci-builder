import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grommet, Main, Header, Button } from "grommet";
import { Moon, Sun } from "grommet-icons";
import { light, dark } from "./app-themes";
import "./App.css";
import Builder from "./pages/Builder";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

export enum AppTheme {
  LIGHT,
  DARK,
}

const App = () => {
  const [currentTheme, setTheme] = useState(AppTheme.LIGHT);

  return (
    <Grommet
      theme={currentTheme === AppTheme.LIGHT ? light : dark}
      background="background"
      className="layout"
    >
      <Router>
        <Header justify="between">
          <Link to="/">Home</Link>
          {currentTheme === AppTheme.LIGHT ? (
            <Button icon={<Moon />} onClick={() => setTheme(AppTheme.DARK)} />
          ) : (
            <Button icon={<Sun />} onClick={() => setTheme(AppTheme.LIGHT)} />
          )}
        </Header>
        <Main align="center" pad="small" height="100vh">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/builder">
              <Builder />
            </Route>
          </Switch>
        </Main>
      </Router>
    </Grommet>
  );
};

export default App;
