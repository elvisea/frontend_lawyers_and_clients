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

export const headers = {
  CLIENT: {
    title: "Resolva seu Caso Jurídico",
    description: "Crie sua conta gratuitamente e tenha acesso a advogados especializados prontos para ajudar você. Descreva seu caso, envie documentos e receba suporte jurídico personalizado."
  },
  LAWYER: {
    title: "Expanda sua Atuação Profissional",
    description: "Crie sua conta e tenha acesso a uma plataforma completa para expandir seu alcance profissional. Conecte-se com clientes que precisam da sua expertise e gerencie seus casos em um só lugar."
  }
} as const
