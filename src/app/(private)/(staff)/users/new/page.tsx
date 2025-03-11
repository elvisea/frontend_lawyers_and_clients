'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { ArrowLeft, Loader2, User, AlertCircle } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { UserType } from '@/enums/type'
import { useCreateUser } from '@/hooks/use-create-user'
import { getErrorMessage } from '@/utils/get-error-message'

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
})

type FormData = {
  name: string
  email: string
}

export default function NewUserPage() {
  const router = useRouter()
  const { createUser, isLoading, errorCode } = useCreateUser(UserType.CLIENT)

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    }
  })

  const handleSubmit = async (data: FormData) => {
    await createUser(data)
  }

  return (
    <div className="space-y-6 min-h-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Novo Cliente</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Adicione um novo cliente ao sistema
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Informações do Cliente</CardTitle>
          <CardDescription>
            Preencha os dados básicos do cliente
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorCode && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {getErrorMessage(errorCode)}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email do cliente" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando cliente...
                    </>
                  ) : (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      Criar Cliente
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
} 