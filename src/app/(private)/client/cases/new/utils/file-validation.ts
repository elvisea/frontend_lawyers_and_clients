import Logger from '@/utils/logger'

export const validateFileType = (file: File) => {
  const fileType = file.type.toLowerCase();

  Logger.info('Iniciando validação de arquivo', {
    prefix: 'Validação',
    data: {
      nome: file.name,
      tipo: fileType || 'Não identificado',
      tamanho: `${(file.size / 1024 / 1024).toFixed(2)}MB`
    }
  });

  // Verifica se é uma imagem
  if (fileType.startsWith('image/')) {
    Logger.info('Arquivo validado como imagem', {
      prefix: 'Validação',
      data: { tipo: fileType }
    });
    return true;
  }

  // Verifica outros tipos de arquivo
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'text/csv'
  ];

  const isAllowed = allowedTypes.includes(fileType);

  if (isAllowed) {
    Logger.info('Arquivo validado como documento', {
      prefix: 'Validação',
      data: { tipo: fileType }
    });
  } else {
    Logger.warn('Tipo de arquivo não permitido', {
      prefix: 'Validação',
      data: { 
        tipo: fileType,
        tiposPermitidos: allowedTypes 
      }
    });
  }

  return isAllowed;
};

export const validateFileSize = (file: File) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const isValid = file.size <= maxSize;

  if (!isValid) {
    Logger.warn('Arquivo excede o limite de tamanho', {
      prefix: 'Validação',
      data: {
        tamanhoAtual: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        tamanhoMaximo: '10MB'
      }
    });
  } else {
    Logger.info('Tamanho do arquivo válido', {
      prefix: 'Validação',
      data: {
        tamanho: `${(file.size / 1024 / 1024).toFixed(2)}MB`
      }
    });
  }

  return isValid;
}; 