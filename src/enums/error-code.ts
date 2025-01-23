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

  PHONE_ESTABLISHMENT_ALREADY_EXISTS = 'PHONE_ESTABLISHMENT_ALREADY_EXISTS'
}

export enum SuccessCode {
  EMAIL_VERIFICATION_SUCCESS = "EMAIL_VERIFICATION_SUCCESS",
  EMAIL_VERIFICATION_RENEW_SUCCESS = "EMAIL_VERIFICATION_RENEW_SUCCESS",
  ESTABLISHMENT_CREATION_SUCCESS = "ESTABLISHMENT_CREATION_SUCCESS",
  SERVICE_CREATION_SUCCESS = "SERVICE_CREATION_SUCCESS",
  EMPLOYEE_CREATION_SUCCESS = "EMPLOYEE_CREATION_SUCCESS",
}

export enum Roles {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}
