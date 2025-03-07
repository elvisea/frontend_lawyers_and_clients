import * as yup from 'yup';

export const schema = yup.object({
  email: yup
    .string()
    .email('Please, provide a valid e-mail address.')
    .required('E-mail is required.'),
});

export type Form = yup.InferType<typeof schema>;
