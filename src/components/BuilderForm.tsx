import React, { FC } from "react";
import { Button, Form, Box, Paragraph, Heading } from "grommet";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { Add } from "grommet-icons";
import StageControl from "./StageControl";

const BuilderForm: FC = () => {
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { control, watch } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stages",
  });

  console.log(watch());

  return (
    <FormProvider {...methods}>
      <Form>
        <Box align="center" justify="center">
          {!fields.length && (
            <Box align="center">
              <Heading level="1" responsive size="small" margin="xxsmall">
                Hello! [name]
              </Heading>
              <Paragraph>Create your first Gitlab CI stage</Paragraph>
            </Box>
          )}

          {fields.map(({ id }, index) => (
            <StageControl
              control={control}
              key={id}
              index={index}
              onRemove={remove}
            ></StageControl>
          ))}

          <Button
            primary
            type="button"
            icon={<Add />}
            size="large"
            margin="20px 0"
            label={fields.length === 0 ? "Add stage" : "Add another stage"}
            onClick={append}
          />
        </Box>
      </Form>
    </FormProvider>
  );
};

export default BuilderForm;
