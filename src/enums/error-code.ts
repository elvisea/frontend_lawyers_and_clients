/**
 * Enumeração que representa os códigos de erro utilizados na aplicação.
 *
 * Esta enumeração define códigos que podem ser usados para identificar
 * diferentes tipos de erros que podem ocorrer durante a execução do sistema.
 * Cada código é único e pode ser associado a mensagens de erro específicas,
 * facilitando a identificação e o tratamento de erros no frontend.
 */
export enum ErrorCode {
  /**
   * Código de erro para indicar um erro desconhecido.
   */
  UNKNOWN_ERROR = "UNKNOWN_ERROR",

  /**
   * Código de erro para indicar que o token expirou.
   */
  TOKEN_EXPIRED = "TOKEN_EXPIRED",

  /**
   * Código de erro para indicar que o token não foi encontrado.
   */
  TOKEN_NOT_FOUND = "TOKEN_NOT_FOUND",

  /**
   * Código de erro para indicar que o token já foi utilizado.
   */
  TOKEN_ALREADY_USED = "TOKEN_ALREADY_USED",

  /**
   * Código de erro para indicar que o usuário não foi encontrado.
   */
  USER_NOT_FOUND = "USER_NOT_FOUND",

  /**
   * Código de erro para indicar que o usuário já existe.
   */
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",

  /**
   * Código de erro para indicar que o registro de verificação de email não foi encontrado.
   */
  EMAIL_VERIFICATION_REGISTER_NOT_FOUND = "EMAIL_VERIFICATION_REGISTER_NOT_FOUND",

  /**
   * Código de erro para indicar que o email já foi verificado.
   */
  EMAIL_ALREADY_VERIFIED = "EMAIL_ALREADY_VERIFIED",

  /**
   * Código de erro para indicar que o email não foi verificado.
   */
  EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",

  /**
   * Código de erro para indicar que as credenciais fornecidas são inválidas.
   */
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",

  /**
 * Código de erro para indicar que o email já existe, mas não foi verificado.
 */
  EMAIL_ALREADY_EXISTS_NOT_VERIFIED = 'EMAIL_ALREADY_EXISTS_NOT_VERIFIED',

  /**
   * Código de erro para indicar que o email já existe e já foi verificado.
   */
  EMAIL_ALREADY_EXISTS_VERIFIED = 'EMAIL_ALREADY_EXISTS_VERIFIED',

  /**
   * Código de erro para indicar que um telefone de estabelecimento já está cadastrado.
   */
  PHONE_ESTABLISHMENT_ALREADY_EXISTS = 'PHONE_ESTABLISHMENT_ALREADY_EXISTS',

  /**
   * Código de erro para indicar que o email ou senha fornecidos são inválidos.
   */
  INVALID_EMAIL_OR_PASSWORD = 'INVALID_EMAIL_OR_PASSWORD',

  /**
   * Código de erro para indicar que os tipos de documentos fornecidos são inválidos.
   */
  INVALID_DOCUMENT_TYPES = 'INVALID_DOCUMENT_TYPES',

  /**
   * Código de erro para indicar que o caso não foi encontrado.
   */
  CASE_NOT_FOUND = 'CASE_NOT_FOUND',

  /**
   * Código de erro para indicar que o usuário não é proprietário do caso.
   */
  CASE_NOT_OWNED = 'CASE_NOT_OWNED',

  /**
   * Código de erro para indicar que o tamanho do arquivo é inválido.
   */
  INVALID_FILE_SIZE = 'INVALID_FILE_SIZE',

  /**
   * Código de erro para indicar que o limite de casos do plano foi excedido.
   */
  CASES_LIMIT_EXCEEDED = 'CASES_LIMIT_EXCEEDED',

  /**
 * Código de sucesso para indicar que a criação do perfil do advogado foi concluída.
 */
  LAWYER_PROFILE_NOT_FOUND = "LAWYER_PROFILE_NOT_FOUND",
}

/**
 * Enumeração que representa os códigos de sucesso utilizados na aplicação.
 */
export enum SuccessCode {
  /**
   * Código de sucesso para indicar que a verificação de email foi concluída.
   */
  EMAIL_VERIFICATION_SUCCESS = "EMAIL_VERIFICATION_SUCCESS",

  /**
   * Código de sucesso para indicar que a renovação da verificação de email foi concluída.
   */
  EMAIL_VERIFICATION_RENEW_SUCCESS = "EMAIL_VERIFICATION_RENEW_SUCCESS",

  /**
   * Código de sucesso para indicar que a criação do estabelecimento foi concluída.
   */
  ESTABLISHMENT_CREATION_SUCCESS = "ESTABLISHMENT_CREATION_SUCCESS",

  /**
   * Código de sucesso para indicar que a criação do serviço foi concluída.
   */
  SERVICE_CREATION_SUCCESS = "SERVICE_CREATION_SUCCESS",

  /**
   * Código de sucesso para indicar que a criação do funcionário foi concluída.
   */
  EMPLOYEE_CREATION_SUCCESS = "EMPLOYEE_CREATION_SUCCESS",
}


