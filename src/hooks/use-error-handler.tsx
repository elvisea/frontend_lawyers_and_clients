import { useState } from "react";

import { AppError } from "@/errors/app-error";
import { errors } from "@/app/constants/errors";

import { CustomAlertDialog } from "@/components/CustomAlertDialog";

// Define o tipo do erro e os detalhes a serem mostrados no dialog
type HandleErrorProps = {
  error: unknown;
  callback?: () => void;
};

type ErrorDetails = { title: string; description: string; buttonText: string; };

const initialErrorDetails: ErrorDetails = { title: "", description: "", buttonText: "OK" };

export const useErrorHandler = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorDetails, setErrorDetails] = useState<ErrorDetails>(initialErrorDetails);

  // Função para tratar os erros
  const handleAppError = ({ error, callback }: HandleErrorProps) => {
    let title = errors["UNKNOWN_ERROR"].title;
    let description = errors["UNKNOWN_ERROR"].description;
    let buttonText = 'OK';

    // Se o erro for uma instância de AppError, mapeamos o erro para os detalhes
    if (error instanceof AppError) {
      const mappedError = errors[error.errorCode] || errors["UNKNOWN_ERROR"];
      title = mappedError.title;
      description = mappedError.description;
      buttonText = mappedError.text || "OK";
    }

    // Atualiza os detalhes do erro para serem exibidos no alerta
    setErrorDetails({ title, description, buttonText });

    // Abre o dialog de erro
    setIsDialogOpen(true);

    // Armazena o callback para ser executado quando o botão for pressionado
    if (callback) {
      // Guardando o callback diretamente no estado
      setCallback(() => callback);
    }
  };

  // Função para fechar o dialog
  const closeErrorDialog = () => setIsDialogOpen(false);

  // Callback armazenado no estado
  const [callback, setCallback] = useState<(() => void) | null>(null);

  // Função para executar o callback quando o botão do modal for pressionado
  const handleAction = () => {
    if (callback) {
      callback(); // Executa o callback
    }
    closeErrorDialog(); // Fecha o modal
  };

  // Componente que exibe o alerta com os detalhes do erro
  const errorDialog = (
    <CustomAlertDialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      title={errorDetails.title}
      description={errorDetails.description}
      actionText={errorDetails.buttonText}
      onAction={handleAction}
    />
  );

  return { handleAppError, errorDialog };
};
