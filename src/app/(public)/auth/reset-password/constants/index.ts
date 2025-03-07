import * as yup from 'yup';

export interface Form {
  password: string;
  confirmation: string;
}

export const schema = yup.object().shape({
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .max(30, 'A senha deve ter no máximo 30 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial'
    ),
  confirmation: yup
    .string()
    .required('A confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas não conferem')
});
