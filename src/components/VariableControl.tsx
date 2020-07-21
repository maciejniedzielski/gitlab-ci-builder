import React, { ChangeEvent } from "react";
import { Box, FormField, TextInput, Button, Text } from "grommet";
import { Trash } from "grommet-icons";
import { Variable } from "../interfaces";

interface VariableControlProps {
  value: Variable;
  index: number;
  onChange: (value: Variable) => void;
  onRemove: (id: string) => void;
}

const VariableControl = ({
  value,
  index,
  onChange,
  onRemove,
}: VariableControlProps) => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const variable = {
      ...value,
      [e.target.name]: e.target.value,
    };

    onChange(variable);
  };

  return (
    <Box direction="row" align="center">
      <Text margin="0 15px 0 0">#{index + 1}</Text>
      <FormField name="key" html-for="key" label="Key">
        <TextInput
          id="key"
          name="key"
          placeholder="e.g. BASE_URL"
          onChange={(e) => handleValueChange(e)}
        />
      </FormField>
      <FormField name="value" html-for="value" label="Value">
        <TextInput
          id="value"
          name="value"
          placeholder="e.g. https://example.domain"
          onChange={(e) => handleValueChange(e)}
        />
      </FormField>
      <Button
        type="button"
        plain
        icon={<Trash />}
        onClick={() => onRemove(value.id)}
      />
    </Box>
  );
};

export default VariableControl;
