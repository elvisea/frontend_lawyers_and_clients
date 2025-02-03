'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const schema = yup.object({
  number: yup.string()
    .required('Número do cartão é obrigatório')
    .min(16, 'Número do cartão inválido')
    .max(16, 'Número do cartão inválido')
    .matches(/^\d+$/, 'Apenas números são permitidos'),
  name: yup.string()
    .required('Nome é obrigatório')
    .min(3, 'Nome inválido')
    .matches(/^[A-Za-z\s]+$/, 'Apenas letras são permitidas'),
  expiry: yup.string()
    .required('Data de validade é obrigatória')
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Data inválida')
    .test('expiry', 'Cartão expirado', (value) => {
      if (!value) return false
      const [month, year] = value.split('/')
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1)
      return expiry > new Date()
    }),
  cvv: yup.string()
    .required('CVV é obrigatório')
    .min(3, 'CVV inválido')
    .max(4, 'CVV inválido')
    .matches(/^\d+$/, 'Apenas números são permitidos'),
})

type Form = yup.InferType<typeof schema>

interface CreditCardFormProps {
  onSubmit: (data: Form) => void
  isLoading?: boolean
  buttonText?: string
}

export function CreditCardForm({
  onSubmit,
  isLoading = false,
  buttonText = 'Finalizar Pagamento'
}: CreditCardFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Form>({
    resolver: yupResolver(schema)
  })

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setValue('number', value)
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')

    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4)
    }

    setValue('expiry', value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="number"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Número do Cartão
        </label>
        <Input
          id="number"
          placeholder="0000 0000 0000 0000"
          maxLength={16}
          {...register('number')}
          onChange={handleNumberChange}
          className={errors.number ? 'border-red-500' : ''}
        />
        {errors.number && (
          <p className="text-sm text-red-500">{errors.number.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Nome no Cartão
        </label>
        <Input
          id="name"
          placeholder="Nome como está no cartão"
          className={`uppercase ${errors.name ? 'border-red-500' : ''}`}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="expiry"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Validade
          </label>
          <Input
            id="expiry"
            placeholder="MM/AA"
            maxLength={5}
            {...register('expiry')}
            onChange={handleExpiryChange}
            className={errors.expiry ? 'border-red-500' : ''}
          />
          {errors.expiry && (
            <p className="text-sm text-red-500">{errors.expiry.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="cvv"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            CVV
          </label>
          <Input
            id="cvv"
            type="password"
            placeholder="123"
            maxLength={4}
            {...register('cvv')}
            className={errors.cvv ? 'border-red-500' : ''}
          />
          {errors.cvv && (
            <p className="text-sm text-red-500">{errors.cvv.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {buttonText}
      </Button>
    </form>
  )
} 