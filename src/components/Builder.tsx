import React from "react";
import { Box } from "grommet";
import Pipeline from "./Pipeline";
import BuilderForm from "./BuilderForm";

const Builder = () => {
  return (
    <Box>
      <Pipeline />
      <BuilderForm />
    </Box>
  );
};

export default Builder;
