import * as yup from 'yup';

export const schema = yup.object({
  title: yup
    .string()
    .required('Por favor, insira um título para o caso.'),

  description: yup
    .string()
    .required('Por favor, insira uma descrição para o caso.'),

  documents: yup
    .array()
    .of(
      yup.object().shape({
        type: yup
          .string()
          .required('Por favor, insira o tipo do documento.')
          .max(50, 'O tipo do documento não pode ter mais de 50 caracteres.'),

        file: yup
          .mixed<File>()
          .nullable() // Permite null como valor inicial
          .test(
            'fileRequired',
            'Por favor, selecione um arquivo.',
            (value) => {
              // Exige um arquivo antes do envio
              return value !== null;
            }
          )
          .test(
            'fileType',
            'Apenas arquivos PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, etc. são permitidos.',
            (value) => {
              if (!value) return true; // Ignora a validação se o arquivo não foi selecionado
              const allowedMimeTypes = [
                // Documentos de Texto
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/rtf',
                'text/plain',

                // Planilhas
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'text/csv',

                // Apresentações
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',

                // LibreOffice/OpenOffice
                'application/vnd.oasis.opendocument.text',
                'application/vnd.oasis.opendocument.spreadsheet',
                'application/vnd.oasis.opendocument.presentation',
                'application/vnd.oasis.opendocument.graphics',

                // Imagens
                'image/webp',
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/bmp',
                'image/tiff',
                'image/svg+xml',
                'image/heic',
                'image/heif',
                'image/x-raw',
              ];
              return allowedMimeTypes.includes((value as File).type);
            }
          )
          .test(
            'fileSize',
            'O arquivo não pode ser maior que 10MB.',
            (value) => {
              if (!value) return true; // Ignora a validação se o arquivo não foi selecionado
              return (value as File).size <= 10 * 1024 * 1024; // 10MB
            }
          ),
      })
    )
    .min(1, 'Adicione pelo menos um documento.'),
});