import { ErrorCode } from '@/enums/error-code'

export const getErrorMessage = (errorCode: ErrorCode): string => {
  const errorMessages: Record<ErrorCode, string> = {
    [ErrorCode.INVALID_CREDENTIALS]: 'As credenciais fornecidas são inválidas. Por favor, verifique seus dados e tente novamente.',
    [ErrorCode.USER_NOT_FOUND]: 'Não foi possível encontrar o usuário especificado. Por favor, verifique se o cliente ainda existe.',
    [ErrorCode.USER_ALREADY_EXISTS]: 'Já existe uma conta cadastrada com este email. Por favor, use outro email ou faça login.',
    [ErrorCode.UNKNOWN_ERROR]: 'Ops! Algo deu errado. Por favor, tente novamente em alguns instantes.',
    [ErrorCode.TOKEN_EXPIRED]: 'O link de acesso expirou. Por favor, solicite um novo link.',
    [ErrorCode.TOKEN_NOT_FOUND]: 'Link de acesso inválido ou já utilizado. Por favor, solicite um novo.',
    [ErrorCode.TOKEN_ALREADY_USED]: 'Este link já foi utilizado. Por favor, solicite um novo se necessário.',
    [ErrorCode.EMAIL_VERIFICATION_REGISTER_NOT_FOUND]: 'Não encontramos o registro de verificação do seu email. Por favor, tente o processo novamente.',
    [ErrorCode.EMAIL_ALREADY_VERIFIED]: 'Este email já foi verificado. Você pode fazer login normalmente.',
    [ErrorCode.EMAIL_NOT_VERIFIED]: 'Por favor, verifique seu email antes de continuar. Enviamos um link de verificação para sua caixa de entrada.',
    [ErrorCode.EMAIL_ALREADY_EXISTS_NOT_VERIFIED]: 'Este email já está cadastrado, mas ainda não foi verificado. Verifique sua caixa de entrada ou solicite um novo email de verificação.',
    [ErrorCode.EMAIL_ALREADY_EXISTS_VERIFIED]: 'Este email já está em uso por outra conta. Por favor, utilize um email diferente.',
    [ErrorCode.PHONE_ESTABLISHMENT_ALREADY_EXISTS]: 'Este telefone já está cadastrado para outro estabelecimento.',
    [ErrorCode.INVALID_EMAIL_OR_PASSWORD]: 'Email ou senha incorretos. Por favor, verifique seus dados e tente novamente.',
    [ErrorCode.INVALID_DOCUMENT_TYPES]: 'O tipo de documento selecionado não é válido para esta operação.',
    [ErrorCode.CASE_NOT_FOUND]: 'Não foi possível encontrar o caso especificado. Ele pode ter sido removido ou você não tem acesso.',
    [ErrorCode.CASE_NOT_OWNED]: 'Você não tem permissão para acessar este caso.',
    [ErrorCode.INVALID_FILE_SIZE]: 'O arquivo é muito grande. Por favor, use um arquivo menor que 10MB.',
    [ErrorCode.CASES_LIMIT_EXCEEDED]: 'Você atingiu o limite de casos para seu plano atual. Considere fazer um upgrade.',
    [ErrorCode.LAWYER_PROFILE_NOT_FOUND]: 'Perfil de advogado não encontrado. Por favor, complete seu cadastro.',
    [ErrorCode.CLIENT_PROFILE_NOT_FOUND]: 'Perfil de cliente não encontrado. Por favor, complete seu cadastro.',
    [ErrorCode.INVALID_USER_TYPE]: 'Este usuário não é um cliente. Apenas clientes podem ter casos registrados.'
  }

  return errorMessages[errorCode] || 'Ocorreu um erro inesperado. Por favor, tente novamente.'
} 