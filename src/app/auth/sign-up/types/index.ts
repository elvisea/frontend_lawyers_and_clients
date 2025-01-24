import { schema } from "../constants";

export type Form = Record<keyof typeof schema.fields, string>;

