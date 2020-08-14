import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grommet, Main, Header, Button } from "grommet";
import { Moon, Sun } from "grommet-icons";
import { light, dark } from "./app-themes";
import "./App.css";
import Builder from "./pages/Builder";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

export enum AppTheme {
  LIGHT = "light",
  DARK = "dark",
}

const App = () => {
  const [currentTheme, setTheme] = useState(AppTheme.LIGHT);

  useEffect(() => {
    try {
      const theme = JSON.parse(localStorage.getItem("theme") as string);
      setTheme(theme);
    } catch (error) {
      localStorage.setItem("theme", JSON.stringify(AppTheme.LIGHT));
    }
  }, []);

  const handleThemeChange = () => {
    const theme =
      currentTheme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;

    localStorage.setItem("theme", JSON.stringify(theme));
    setTheme(theme);
  };

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
            <Button icon={<Moon />} onClick={handleThemeChange} />
          ) : (
            <Button icon={<Sun />} onClick={handleThemeChange} />
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
