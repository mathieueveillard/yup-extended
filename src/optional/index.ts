import { AnySchema, lazy, mixed } from "yup";

export function optional(schema: AnySchema) {
  return lazy((value) => {
    if (value === undefined) {
      return mixed().test(() => true);
    }
    return schema;
  });
}
