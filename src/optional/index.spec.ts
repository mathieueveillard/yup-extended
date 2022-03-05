import { number, object } from "yup";
import { optional } from ".";

test("YUP: allows validation based on a schema", async function () {
  // GIVEN
  const schema = object({
    nestedObject: object({
      value: number().required(),
    }),
  });

  // WHEN
  // THEN
  await expect(schema.validate({ nestedObject: {} })).rejects.toThrow();
});

test("YUP: but does not allow a nested object to be undefined", async function () {
  // GIVEN
  const schema = object({
    nestedObject: object({
      value: number().required(),
    }),
  });

  // WHEN
  // THEN
  await expect(schema.validate({})).rejects.toThrow();
});

test("it should allow validation based on a schema", async function () {
  // GIVEN
  const schema = object({
    nestedObject: optional(
      object({
        value: number().required(),
      })
    ),
  });

  // WHEN
  // THEN
  await expect(schema.validate({ nestedObject: {} })).rejects.toThrow();
});

test("but should allow a nested object to be undefined", async function () {
  // GIVEN
  const schema = object({
    nestedObject: optional(
      object({
        value: number().required(),
      })
    ),
  });

  // WHEN
  // THEN
  expect(schema.validate({})).resolves;
});
