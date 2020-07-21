import React, { useState, ChangeEvent } from "react";
import { Button, Form, Box, Paragraph, Heading } from "grommet";
import { Add } from "grommet-icons";
import { generate } from "shortid";
import { Stage } from "../interfaces";
import StageControl from "./StageControl";

const BuilderForm = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const emptyStage: Stage = {
    id: generate(),
    name: "",
    run_branch: [],
    except_branch: [],
    image: "",
    variables: [],
    scripts: "",
    dependencies: [],
  };

  const handleFormChange = (e: ChangeEvent<HTMLFormElement>) => {
    console.log(e);
  };

  const handleFieldChange = (value: Stage): void => {
    setStages([
      ...stages.map((stage) => (stage.id === value.id ? { ...value } : stage)),
    ]);
  };

  const handleFieldRemove = (id: string) => {
    setStages([...stages.filter((stage) => stage.id !== id)]);
  };

  return (
    <Form onChange={handleFormChange}>
      <Box align="center" justify="center">
        {!stages.length && (
          <Box align="center">
            <Heading level="1" responsive size="small" margin="xxsmall">
              Hello! [name]
            </Heading>
            <Paragraph>Create your first Gitlab CI stage</Paragraph>
          </Box>
        )}
        {stages.map((value, index) => (
          <StageControl
            key={value.id}
            stages={stages}
            value={value}
            index={index}
            onChange={handleFieldChange}
            onRemove={handleFieldRemove}
          ></StageControl>
        ))}

        <Button
          primary
          type="button"
          icon={<Add />}
          size="large"
          margin="20px 0"
          label={stages.length === 0 ? "Add stage" : "Add another stage"}
          onClick={() => setStages((stages) => [...stages, emptyStage])}
        />
      </Box>
    </Form>
  );
};

export default BuilderForm;
