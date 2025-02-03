import * as yup from 'yup';
import { validateFileType, validateFileSize } from '../utils/file-validation';

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
          .nullable()
          .test(
            'fileType',
            'Apenas arquivos PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG, etc. são permitidos.',
            (value) => {
              if (!value) return true;
              return validateFileType(value as File);
            }
          )
          .test(
            'fileSize',
            'O arquivo não pode ser maior que 10MB.',
            (value) => {
              if (!value) return true;
              return validateFileSize(value as File);
            }
          ),
      })
    )
    .min(1, 'Adicione pelo menos um documento.'),
});