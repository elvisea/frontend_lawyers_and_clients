import * as yup from 'yup';

export const schema = yup.object({
  name: yup
    .string()
    .required('Please, enter your full name.')
    .test('full-name', 'Please, enter your full name', (value) => value?.split(' ').length > 1),

  email: yup
    .string()
    .email('Please, provide a valid e-mail address.')
    .required('Please, provide your email address.'),

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
