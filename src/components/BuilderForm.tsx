import React, { FC } from "react";
import { Button, Form, Box, Paragraph, Heading } from "grommet";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { Add } from "grommet-icons";
import StageControl from "./StageControl";
import { yupResolver } from "@hookform/resolvers";
import { array, object, string } from "yup";

const formSchema = object().shape({
  stages: array().of(
    object()
      .shape({
        name: string().required(),
        scripts: string().required(),
        run_branch: array().of(string()).min(1),
        except_branch: array().of(string()),
        image: string(),
        dependencies: array().of(string()),
      })
      .default([])
  ),
});

const BuilderForm: FC = () => {
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(formSchema),
  });
  const { control, handleSubmit, errors } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stages",
  });

  const onSubmit = (data: any) => console.log(data, errors);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
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

          <Box align="center" justify="between" direction="row">
            <Button
              primary={!fields.length}
              type="button"
              icon={<Add />}
              size="large"
              margin="20px"
              label={fields.length === 0 ? "Add stage" : "Add another stage"}
              onClick={append}
            />

            {fields.length > 0 && (
              <Button
                primary
                type="submit"
                icon={<Add />}
                size="large"
                margin="20px"
                label="Generate YAML"
              />
            )}
          </Box>
        </Box>
      </Form>
    </FormProvider>
  );
};

export default BuilderForm;
