import * as yup from 'yup';

export const schema = yup.object({
  email: yup
    .string()
    .email('Please, provide a valid e-mail address.')
    .required('Please, enter your email.'),
  password: yup
    .string()
    .min(6, 'Password should have at least 6 characters.')
    .required('Please, enter your password.'),
});
