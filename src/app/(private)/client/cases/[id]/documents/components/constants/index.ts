import * as yup from 'yup';

import { validateFileSize, validateFileType } from '../../../../new/utils/file-validation';

export const schema = yup.object({
  type: yup
    .string()
    .required('Selecione o tipo de documento'),

  customType: yup.string().when('type', {
    is: 'Outro',
    then: (schema) => schema.required('Informe o tipo de documento'),
    otherwise: (schema) => schema.notRequired(),
  }),

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
});

export type DocumentFormData = yup.InferType<typeof schema> 