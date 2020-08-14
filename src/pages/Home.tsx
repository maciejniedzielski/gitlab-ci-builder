import React from "react";
import { Box, Paragraph, Button } from "grommet";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../images/gitlab-icon.svg";
import logoMono from "../images/gitlab-logo-mono.svg";
import { GITLAB_OAUTH2_URL } from "../constants";

const Logo = styled.h1`
  font-size: 48px;
  font-weight: 500;
  color: #8c929c;
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const GitlabButton = styled(Button)`
  border-radius: 4px;
  padding: 5px 10px;
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

const ButtonImage = styled.img`
  height: 50px;
`;

const Home = () => {
  return (
    <Box align="center" justify="center">
      <Logo>
        <LogoIcon width="100px" />
        Gitlab CI Builder
      </Logo>

      <Paragraph textAlign="center" margin="small">
        This tool will help you with fast building CI/CD process for your
        projects.
      </Paragraph>
      <Paragraph textAlign="center" margin="0 0 50px 0">
        You can start with public repositories or sign in with Gitlab to get
        access to your private repositories.
      </Paragraph>

      <Paragraph textAlign="center" margin="0">
        <Link to="/builder" className="link">
          Start with public repo
        </Link>
      </Paragraph>
      <Paragraph>or</Paragraph>
      <a href={GITLAB_OAUTH2_URL} className="link">
        <GitlabButton
          primary
          reverse
          label="Sign in with"
          icon={<ButtonImage src={logoMono} />}
        />
      </a>
    </Box>
  );
};

export default Home;
