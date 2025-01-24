import * as yup from 'yup';

export const schema = yup.object({
  email: yup
    .string()
    .email('Please, provide a valid e-mail address.')
    .required('E-mail is required.'),
  password: yup
    .string()
    .min(1, 'Please, provide your password.')
    .required('Password is required.'),
});
