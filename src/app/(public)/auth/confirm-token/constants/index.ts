import * as yup from "yup";

export const schema = yup.object({
  token: yup
    .string()
    .required('Please, provide your token.')
    .min(6, 'Code should have at least 6 characters.')
    .max(6, 'Code should have at most 6 characters.')
    .matches(/^\d+$/, 'Code should contain only numbers.')
});
