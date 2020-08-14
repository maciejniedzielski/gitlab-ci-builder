import React from "react";
import { Box } from "grommet";
import Pipeline from "../components/Pipeline";
import BuilderForm from "../components/BuilderForm";

const Builder = () => {
  return (
    <Box>
      <Pipeline />
      <BuilderForm />
    </Box>
  );
};

export default Builder;
