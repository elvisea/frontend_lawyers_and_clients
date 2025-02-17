import { CreditCardForm } from "../credit-card-form"

// Função separada para o conteúdo de cartão de crédito (para uso futuro)
export const CreditCardContent = ({ isProcessing, handlePayment }: {
  isProcessing: boolean
  handlePayment: () => Promise<void>
}) => {
  return (
    <CreditCardForm
      onSubmit={handlePayment}
      isLoading={isProcessing}
      buttonText="Assinar Plano"
    />
  )
}