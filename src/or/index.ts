import { AnySchema, mixed } from "yup";

export default function (...schemas: AnySchema[]): AnySchema {
  async function test(input: any): Promise<boolean> {
    const results = await Promise.all(schemas.map(validateInputAgainstSchema(input)));
    return results.some(isTrue);
  }

  return mixed().test({
    name: "yup-extended-or",
    message: "yup-extended-or error: ${path} doesn't match any schema",
    test,
  });
}

function isTrue(value: boolean): boolean {
  return value;
}

const validateInputAgainstSchema =
  (input: any) =>
  (schema: AnySchema): Promise<boolean> =>
    schema.isValid(input);
