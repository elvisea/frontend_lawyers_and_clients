import * as yup from 'yup';

export const schema = yup.object({
  password: yup
    .string()
    .min(6, 'Password should have at least 6 characters.')
    .required('Please, enter your password.'),

  confirmation: yup
    .string()
    .min(6, 'Password should have at least 6 characters.')
    .required('Please, confirm your password.')
    .oneOf([yup.ref('password')], 'Password confirmation does not match.')
});
