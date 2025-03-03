import * as yup from 'yup'

export const profileSchema = yup.object({
  phone: yup.string()
    .required('Telefone é obrigatório')
    .min(13, 'Formato inválido. Use: +5511987654321')
    .matches(/^\+55\d{10,11}$/, 'Formato inválido. Use: +5511987654321'),

  address: yup.object({
    street: yup.string().required('Rua é obrigatória'),
    number: yup.string().required('Número é obrigatório'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
    state: yup.string().required('Estado é obrigatório').length(2, 'Estado inválido'),
    zipCode: yup.string().required('CEP é obrigatório'),
    complement: yup.string(),
  }),

  specialties: yup.array()
    .of(yup.string())
    .min(1, 'Selecione pelo menos uma especialidade')
    .default([]),
  description: yup.string().required('Descrição é obrigatória'),

  oab: yup.object({
    number: yup.string().required('Número da OAB é obrigatório'),
    state: yup.string().required('Estado da OAB é obrigatório').length(2, 'Estado inválido'),
  }),

  yearsOfExp: yup.number().required('Anos de experiência é obrigatório'),
  education: yup.string().required('Formação acadêmica é obrigatória'),
  certificates: yup.array()
    .of(yup.string())
    .default([]),
})

export type ProfileFormData = yup.InferType<typeof profileSchema> 