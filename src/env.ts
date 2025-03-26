import * as yup from 'yup'

const envSchema = yup.object({
  NODE_ENV: yup
    .string()
    .required('Ambiente é obrigatório')
    .oneOf(['development', 'production'], 'Ambiente inválido'),

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

  NEXT_PUBLIC_FIREBASE_API_KEY: yup
    .string()
    .required('API Key do Firebase é obrigatória'),

  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: yup
    .string()
    .required('Domínio do Firebase é obrigatório'),

  NEXT_PUBLIC_FIREBASE_PROJECT_ID: yup
    .string()
    .required('ID do projeto Firebase é obrigatório'),

  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: yup
    .string()
    .required('Bucket do Firebase é obrigatório'),

  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: yup
    .string()
    .required('ID do remetente do Firebase é obrigatório'),

  NEXT_PUBLIC_FIREBASE_APP_ID: yup
    .string()
    .required('ID do aplicativo Firebase é obrigatório'),

  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: yup
    .string()
    .required('ID de medição do Firebase é obrigatório'),
}).required()

type EnvSchema = yup.InferType<typeof envSchema>

function validateEnv(): EnvSchema {
  try {
    return envSchema.validateSync({
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
      NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
      NEXT_PUBLIC_PHONE_NUMBER: process.env.NEXT_PUBLIC_PHONE_NUMBER,
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    })
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new Error(`Validação de variáveis de ambiente falhou: ${error.message}`)
    }
    throw error
  }
}

export const env = validateEnv()