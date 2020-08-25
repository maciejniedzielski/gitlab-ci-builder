import React, { FC } from "react";
import { Box, FormField, TextInput, Button, Text } from "grommet";
import { Trash } from "grommet-icons";
import { UseFormMethods } from "react-hook-form";
import { ConnectForm } from "./StageControl";

type VariableControl = {
  stageIndex: number;
  index: number;
  onRemove: (index?: number | number[] | undefined) => void;
};

const VariableControl: FC<VariableControl> = ({
  index,
  stageIndex,
  onRemove,
}) => {
  return (
    <ConnectForm>
      {({ register }: UseFormMethods<any>) => (
        <Box direction="row" align="center">
          <Text margin="0 15px 0 0">#{index + 1}</Text>
          <FormField name="key" html-for="key" label="Key">
            <TextInput
              id={`stages[${stageIndex}].variables[${index}].name`}
              name={`stages[${stageIndex}].variables[${index}].name`}
              placeholder="e.g. BASE_URL"
              ref={register}
            />
          </FormField>
          <FormField name="value" html-for="value" label="Value">
            <TextInput
              id={`stages[${stageIndex}].variables[${index}].value`}
              name={`stages[${stageIndex}].variables[${index}].value`}
              placeholder="e.g. https://example.domain"
              ref={register}
            />
          </FormField>
          <Button
            type="button"
            plain
            icon={<Trash />}
            onClick={() => onRemove(index)}
          />
        </Box>
      )}
    </ConnectForm>
  );
};

export default VariableControl;
