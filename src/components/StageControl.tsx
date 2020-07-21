import React, { ChangeEvent } from "react";
import {
  Box,
  FormField,
  TextInput,
  Button,
  Paragraph,
  Select,
  TextArea,
} from "grommet";
import { generate } from "shortid";
import { Add, Trash } from "grommet-icons";
import { Stage, Variable } from "../interfaces";
import VariableControl from "./VariableControl";
import FormGroup from "./FormGroup";

interface StageControlProps {
  value: Stage;
  stages: Stage[];
  index: number;
  onChange: (value: Stage) => void;
  onRemove: (id: string) => void;
}

const StageControl = ({
  value,
  stages,
  index,
  onChange,
  onRemove,
}: StageControlProps) => {
  /**
   * List of already added stages to depend on
   */
  const dependencies: Stage[] = stages.filter((s) => s.id !== value.id);
  const emptyVariable: Variable = {
    id: generate(),
    key: "",
    value: "",
  };

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const stage = {
      ...value,
      [e.target.name]: e.target.value,
    };

    onChange(stage);
  };

  const handleVariableChange = (variable: Variable) => {
    const stage = {
      ...value,
      variables: [
        ...value.variables.filter((v) => v.id !== value.id),
        variable,
      ],
    };

    onChange(stage);
  };

  const handleVariableAdd = () => {
    const stage = {
      ...value,
      variables: [...value.variables, emptyVariable],
    };

    onChange(stage);
  };

  const handleVariableRemove = (id: string) => {
    const stage = {
      ...value,
      variables: [...value.variables.filter((v) => v.id !== id)],
    };

    onChange(stage);
  };

  return (
    <Box key={value.id} margin="0 0 30px 0">
      <Box direction="row" align="center" justify="between">
        <Paragraph color="accent-1">Stage #{index}</Paragraph>
        <Button
          secondary
          type="button"
          icon={<Trash />}
          label="Remove"
          onClick={() => onRemove(value.id)}
        />
      </Box>
      <FormGroup>
        <FormField name="name" html-for="name" label="Name">
          <TextInput
            id="name"
            name="name"
            placeholder="e.g. build, test, e2e, release, deploy"
            onChange={(e) => handleValueChange(e)}
          />
        </FormField>

        <Box direction="row">
          <FormField
            name="run_branch"
            html-for="run_branch"
            label="Branch to run (default: all)"
          >
            <Select
              id="run_branch"
              name="run_branch"
              multiple
              closeOnChange={false}
              options={["Branch 1", "Branch 2"]}
              placeholder="Select branch/branches"
              onChange={(e) => handleValueChange(e)}
            />
          </FormField>

          <FormField
            name="except_branch"
            html-for="except_branch"
            label="Branch to except (default: none)"
          >
            <Select
              id="except_branch"
              name="except_branch"
              multiple
              closeOnChange={false}
              options={["Branch 1", "Branch 2"]}
              placeholder="Select branch/branches. Default none"
              onChange={(e) => handleValueChange(e)}
            />
          </FormField>
        </Box>

        <Box direction="row">
          <FormField name="image" html-for="image" label="Image">
            <Select
              id="image"
              name="image"
              options={["default", "Branch 1", "Branch 2"]}
              placeholder="Select docker image for stage"
              onChange={(e) => handleValueChange(e)}
            />
          </FormField>
          <FormField
            name="dependencies"
            html-for="dependencies"
            label="Dependencies"
          >
            <Select
              id="dependencies"
              name="dependencies"
              multiple
              closeOnChange={false}
              options={dependencies}
              labelKey="name"
              placeholder="Select dependencies (stages this stage depends on)"
              onChange={(e) => handleValueChange(e)}
            />
          </FormField>
        </Box>

        <FormField name="scripts" html-for="scripts" label="Scripts">
          <TextArea
            id="scripts"
            name="scripts"
            placeholder="Enter your scripts separated by newline"
            onChange={(e) => handleValueChange(e)}
          />
        </FormField>

        <Box justify="start" align="start" pad="small">
          <Paragraph>Variables:</Paragraph>
          {value.variables.map((variable, index) => (
            <VariableControl
              key={variable.id}
              value={variable}
              index={index}
              onChange={handleVariableChange}
              onRemove={handleVariableRemove}
            />
          ))}
          <Button
            primary
            type="button"
            icon={<Add />}
            margin="20px 0"
            label={
              value.variables.length === 0
                ? "Add variable"
                : "Add another variable"
            }
            onClick={() => handleVariableAdd()}
          />
        </Box>
      </FormGroup>
    </Box>
  );
};

export default StageControl;
