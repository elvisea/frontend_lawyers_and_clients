import * as yup from 'yup'

export const profileSchema = yup.object({
  cpf: yup.string()
    .required('CPF é obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato inválido. Use: 123.456.789-00'),

  rg: yup.string()
    .required('RG é obrigatório')
    .matches(/^\d{2}\.\d{3}\.\d{3}-\d{1}$/, 'Formato inválido. Use: 12.345.678-9'),

  birthDate: yup.string()
    .required('Data de nascimento é obrigatória')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato inválido. Use: DD/MM/AAAA'),

  occupation: yup.string()
    .required('Profissão é obrigatória'),

  phone: yup.string()
    .required('Telefone é obrigatório')
    .min(11, 'Telefone deve ter no mínimo 11 dígitos')
    .max(13, 'Telefone deve ter no máximo 13 dígitos'),

  address: yup.object({
    street: yup.string().required('Rua é obrigatória'),
    number: yup.string().required('Número é obrigatório'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
    state: yup.string().required('Estado é obrigatório').length(2, 'Estado inválido'),
    zipCode: yup.string()
      .required('CEP é obrigatório')
      .matches(/^\d{5}-\d{3}$/, 'Formato inválido. Use: 01234-567'),
    complement: yup.string(),
  }),
})

export type ProfileFormData = yup.InferType<typeof profileSchema> 