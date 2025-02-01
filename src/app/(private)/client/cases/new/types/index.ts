import * as yup from 'yup';
import { schema } from '../constants';

export type Form = yup.InferType<typeof schema>;

export type DocumentField = {
  type: string;
  file: File | null;
};