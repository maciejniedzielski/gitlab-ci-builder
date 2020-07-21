import React from "react";
import styled from "styled-components";
import { Box, Stack, Diagram } from "grommet";

const PipelineJob = styled(Box)`
  border-radius: 100%;
`;

const Pipeline = () => {
  const stages = [1, 2, 3];
  const stagesConnections = stages.map((stage, i) => ({
    fromTarget: String(i),
    toTarget: String(i + 1),
    thickness: "xsmall",
    color: "accent-2",
  }));

  return (
    <Stack guidingChild={1} margin="0 0 30px 0" alignSelf="center">
      <Diagram connections={stagesConnections} />
      <Box direction="row" justify="center" align="center">
        {stages.map((stage, index) => (
          <PipelineJob
            key={`stage-${index}`}
            id={index.toString()}
            margin="small"
            pad="medium"
            background="light-4"
          />
        ))}
      </Box>
    </Stack>
  );
};

export default Pipeline;
