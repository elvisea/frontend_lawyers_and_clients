import axios from "axios";

import { AppError } from "@/errors/app-error";
import { ErrorCode } from "@/enums/error-code";

const API_URL = "http://localhost:3333";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {

      throw new AppError(
        error.response.data.errorCode,
        error.response.data.statusCode,
        error.response.data.error,
        error.response.data.message);
    } else {
      throw new AppError(
        ErrorCode.UNKNOWN_ERROR,
        500,
        error.response.data.error,
        error.response.data.message
      );
    }
  },
);

export default api;
