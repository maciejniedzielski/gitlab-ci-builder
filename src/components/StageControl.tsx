import React, { FC, useContext } from "react";
import {
  Box,
  FormField,
  TextInput,
  Button,
  Paragraph,
  Select,
  TextArea,
} from "grommet";
import { Trash, Add } from "grommet-icons";
import { Stage } from "../interfaces";
import FormGroup from "./FormGroup";
import {
  useFormContext,
  UseFormMethods,
  Controller,
  useFieldArray,
} from "react-hook-form";
import VariableControl from "./VariableControl";
import { ThemeContext } from "../context/ThemeContex";
import FieldErrorMessage from "./FieldErrorMessage";
import { ErrorMessage } from "@hookform/error-message";

type StageControl = {
  index: number;
  control: any;
  onRemove: (index?: number | number[] | undefined) => void;
};

export const ConnectForm: FC<any> = ({ children }) => {
  const methods = useFormContext();

  return children({ ...methods });
};

const StageControl: FC<StageControl> = ({ index, control, onRemove }) => {
  const { theme } = useContext(ThemeContext);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variables",
  });

  /**
   * List of already added stages to depend on
   */
  const dependencies: Stage[] = [];

  return (
    <ConnectForm>
      {({ register, control, errors }: UseFormMethods<any>) => (
        <Box margin="0 0 30px 0">
          <Box direction="row" align="center" justify="between">
            <Paragraph color="accent-1">Stage #{index + 1}</Paragraph>
            <Button
              secondary
              type="button"
              icon={<Trash />}
              label="Remove"
              onClick={() => onRemove(index)}
            />
          </Box>
          <FormGroup theme={theme}>
            <FormField
              name={`stages[${index}].name`}
              html-for={`stages[${index}].name`}
              label="Name"
            >
              <TextInput
                id={`stages[${index}].name`}
                name={`stages[${index}].name`}
                ref={register()}
                placeholder="e.g. build, test, e2e, release, deploy"
              />
            </FormField>
            <ErrorMessage
              errors={errors}
              name={`stages[${index}].name`}
              as={FieldErrorMessage}
            ></ErrorMessage>

            <Box direction="row">
              <Box>
                <Controller
                  name={`stages[${index}].run_branch`}
                  control={control}
                  defaultValue={[]}
                  render={({ onChange, value }) => (
                    <FormField
                      name={`stages[${index}].run_branch`}
                      html-for={`stages[${index}].run_branch`}
                      label="Branch to run (default: all)"
                    >
                      <Select
                        id={`stages[${index}].run_branch`}
                        multiple
                        closeOnChange={false}
                        options={["Branch 1", "Branch 2"]}
                        value={value}
                        placeholder="Select branch/branches"
                        onChange={({ value }) => {
                          onChange(value);
                        }}
                      />
                    </FormField>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name={`stages[${index}].run_branch`}
                  as={FieldErrorMessage}
                ></ErrorMessage>
              </Box>

              <Box>
                <Controller
                  id={`stages[${index}].except_branch`}
                  name={`stages[${index}].except_branch`}
                  control={control}
                  defaultValue={[]}
                  render={({ onChange, value }) => (
                    <FormField
                      name={`stages[${index}].except_branch`}
                      html-for={`stages[${index}].except_branch`}
                      label="Branch to except (default: none)"
                    >
                      <Select
                        multiple
                        closeOnChange={false}
                        options={["Branch 1", "Branch 2"]}
                        placeholder="Select branch/branches. Default none"
                        value={value}
                        onChange={({ value }) => {
                          onChange(value);
                        }}
                      />
                    </FormField>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name={`stages[${index}].except_branch`}
                  as={FieldErrorMessage}
                ></ErrorMessage>
              </Box>
            </Box>

            <Box direction="row">
              <Box>
                <Controller
                  id={`stages[${index}].image`}
                  name={`stages[${index}].image`}
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => (
                    <FormField
                      name={`stages[${index}].image`}
                      html-for={`stages[${index}].image`}
                      label="Image"
                    >
                      <Select
                        closeOnChange={false}
                        options={["Node 10.2", "Node 10.3", "Node 10.4"]}
                        placeholder="Select docker image for stage"
                        value={value}
                        onChange={({ value }) => {
                          onChange(value);
                        }}
                      />
                    </FormField>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name={`stages[${index}].image`}
                  as={FieldErrorMessage}
                ></ErrorMessage>
              </Box>

              <Box>
                <Controller
                  id={`stages[${index}].dependencies`}
                  name={`stages[${index}].dependencies`}
                  control={control}
                  defaultValue={[]}
                  render={({ onChange, value }) => (
                    <FormField
                      name={`stages[${index}].dependencies`}
                      html-for={`stages[${index}].dependencies`}
                      label="Dependencies"
                    >
                      <Select
                        multiple
                        closeOnChange={false}
                        options={dependencies}
                        labelKey="name"
                        placeholder="Select dependencies (stages this stage depends on)"
                        value={value}
                        onChange={({ value }) => {
                          onChange(value);
                        }}
                      />
                    </FormField>
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name={`stages[${index}].dependencies`}
                  as={FieldErrorMessage}
                ></ErrorMessage>
              </Box>
            </Box>

            <FormField
              name={`stages[${index}].scripts`}
              html-for={`stages[${index}].scripts`}
              label="Scripts"
            >
              <TextArea
                resize="vertical"
                id={`stages[${index}].scripts`}
                name={`stages[${index}].scripts`}
                ref={register()}
                rows={4}
                placeholder="Enter your scripts separated by newline"
              />
            </FormField>
            <ErrorMessage
              errors={errors}
              name={`stages[${index}].scripts`}
              as={FieldErrorMessage}
            ></ErrorMessage>

            <Box justify="start" align="start" pad="small">
              <Paragraph>Variables:</Paragraph>

              {fields.map(({ id }, variableIndex) => (
                <VariableControl
                  key={id}
                  stageIndex={index}
                  index={variableIndex}
                  onRemove={remove}
                />
              ))}

              <Button
                type="button"
                icon={<Add />}
                margin="20px 0"
                label={
                  fields.length === 0 ? "Add variable" : "Add another variable"
                }
                onClick={append}
              />
            </Box>
          </FormGroup>
        </Box>
      )}
    </ConnectForm>
  );
};

export default StageControl;
