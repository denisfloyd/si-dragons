import { ValidationError } from "yup";

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationsErrors: Errors = {};

  err.inner.forEach((error) => {
    error.path && (validationsErrors[error.path] = error.message);
  });

  return validationsErrors;
}
