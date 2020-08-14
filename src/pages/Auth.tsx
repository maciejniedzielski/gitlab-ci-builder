import React, { useContext, useEffect } from "react";
import { Paragraph, Box } from "grommet";
import Spinner from "../components/Spinner";
import { ReactComponent as LogoIcon } from "../images/gitlab-icon.svg";
import { useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { parseLocationHash } from "../utils/parse-location-hash";

const Auth = () => {
  const { setToken } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const params: { [key: string]: string } = parseLocationHash(location.hash);
    setToken(params.access_token);
    history.push("/builder");
  }, [location.hash, setToken, history]);

  return (
    <Box align="center" justify="center" height="100%">
      <LogoIcon />

      <Box direction="row" align="center" justify="center">
        <Spinner size="36px" />
        <Paragraph margin="0 20px">Authorizing...</Paragraph>
      </Box>
    </Box>
  );
};

export default Auth;
