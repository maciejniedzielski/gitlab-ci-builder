import React from "react";
import { Box, Paragraph, Button, Text } from "grommet";
import { ReactComponent as LogoIcon } from "../images/gitlab-icon.svg";
import logoMono from "../images/gitlab-logo-mono.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
      <a
        href="https://gitlab.example.com/oauth/authorize?client_id=APP_ID&redirect_uri=REDIRECT_URI&response_type=code&state=YOUR_UNIQUE_STATE_HASH&scope=REQUESTED_SCOPES"
        className="link"
      >
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
