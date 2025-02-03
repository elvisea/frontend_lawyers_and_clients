export const validateFileType = (file: File) => {
  const fileType = file.type.toLowerCase();

  console.log('📝 Validação de Arquivo');
  console.log('├─ Nome:', file.name);
  console.log('├─ Tipo:', fileType || 'Não identificado');
  console.log('└─ Tamanho:', `${(file.size / 1024 / 1024).toFixed(2)}MB`);

  // Verifica se é uma imagem
  if (fileType.startsWith('image/')) {
    console.log('✅ Arquivo aceito como imagem');
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
    console.log('✅ Arquivo aceito como documento');
  } else {
    console.log('❌ Tipo de arquivo não permitido');
  }

  return isAllowed;
};

export const validateFileSize = (file: File) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const isValid = file.size <= maxSize;

  if (!isValid) {
    console.log('❌ Arquivo excede o limite de 10MB');
  }

  return isValid;
}; 