import { number, boolean, object, string } from "yup";
import or from ".";

test("One single schema, valid value", async function () {
  // GIVEN
  const numberSchema = number().required();

  // WHEN
  // THEN
  expect(or(numberSchema).validate(0)).resolves;
});

test("One single schema, invalid value", async function () {
  // GIVEN
  const numberSchema = number().required();

  // WHEN
  // THEN
  await expect(or(numberSchema).validate("Zero")).rejects.toThrow(
    "yup-extended-or error: this doesn't match any schema"
  );
});

test("Two schemas, one matches", async function () {
  // GIVEN
  const numberSchema = number().required();
  const booleanSchema = boolean().required();

  // WHEN
  // THEN
  expect(or(numberSchema, booleanSchema).validate(true)).resolves;
});

test("Two schemas, no matches", async function () {
  // GIVEN
  const numberSchema = number().required();
  const booleanSchema = boolean().required();

  // WHEN
  // THEN
  await expect(or(numberSchema, booleanSchema).validate("Zero")).rejects.toThrow(
    "yup-extended-or error: this doesn't match any schema"
  );
});
