import * as yup from 'yup'

const envSchema = yup.object({
  NEXT_PUBLIC_SITE_URL: yup
    .string()
    .required('URL do site é obrigatória'),

  NEXT_PUBLIC_SITE_NAME: yup
    .string()
    .required('Nome do site é obrigatório')
    .min(3, 'Nome do site deve ter no mínimo 3 caracteres'),

  NEXT_PUBLIC_SITE_DESCRIPTION: yup
    .string()
    .required('Descrição do site é obrigatória')
    .min(10, 'Descrição muito curta'),

  NEXT_PUBLIC_PHONE_NUMBER: yup
    .string()
    .required('Número de telefone é obrigatório')
    .min(11, 'Número de telefone deve ter no mínimo 11 caracteres'),
}).required()

type EnvSchema = yup.InferType<typeof envSchema>

function validateEnv(): EnvSchema {
  try {
    return envSchema.validateSync({
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
      NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
      NEXT_PUBLIC_PHONE_NUMBER: process.env.NEXT_PUBLIC_PHONE_NUMBER,
    })
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new Error(`Validação de variáveis de ambiente falhou: ${error.message}`)
    }
    throw error
  }
}

export const env = validateEnv()

console.log(env)