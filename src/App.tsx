import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grommet, Main, Header, Button } from "grommet";
import { Moon, Sun } from "grommet-icons";
import Builder from "./components/Builder";
import { light, dark } from "./app-themes";
import "./App.css";

export enum AppTheme {
  LIGHT,
  DARK,
}

const App = () => {
  const [currentTheme, setTheme] = useState(AppTheme.LIGHT);

  return (
    <Grommet theme={currentTheme === AppTheme.LIGHT ? light : dark}>
      <Header justify="end">
        {currentTheme === AppTheme.LIGHT ? (
          <Button icon={<Moon />} onClick={() => setTheme(AppTheme.DARK)} />
        ) : (
          <Button icon={<Sun />} onClick={() => setTheme(AppTheme.LIGHT)} />
        )}
      </Header>
      <Main align="center" pad="small" height="100vh">
        <Router>
          <Switch>
            <Route path="/">
              <Builder />
            </Route>
          </Switch>
        </Router>
      </Main>
    </Grommet>
  );
};

export default App;
