import * as yup from 'yup';

export const schema = yup.object({
  name: yup
    .string()
    .required('Por favor, digite seu nome completo.')
    .test('full-name', 'Digite seu nome completo com sobrenome', (value) => value?.split(' ').length > 1),

  email: yup
    .string()
    .email('Digite um endereço de e-mail válido.')
    .required('O e-mail é obrigatório.'),

  password: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('A senha é obrigatória')
    .max(30, 'A senha deve ter no máximo 30 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial'
    ),

  confirmation: yup
    .string()
    .required('A confirmação de senha é obrigatória.')
    .oneOf([yup.ref('password')], 'As senhas não conferem.')
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
