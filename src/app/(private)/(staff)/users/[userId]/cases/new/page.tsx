'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { use } from 'react'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { ArrowLeft, Loader2, FileText } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'

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

import { useCreateInternalCase } from '@/hooks/use-create-internal-case'
import { getErrorMessage } from '@/utils/get-error-message'

interface NewCasePageProps {
  params: Promise<{ userId: string }>
}

const schema = yup.object().shape({
  title: yup.string()
    .required('O título é obrigatório')
    .min(3, 'O título deve ter no mínimo 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
  description: yup.string()
    .required('A descrição é obrigatória')
    .min(10, 'A descrição deve ter no mínimo 10 caracteres')
    .max(500, 'A descrição deve ter no máximo 500 caracteres'),
  price: yup.number()
    .min(0, 'O valor não pode ser negativo')
    .moreThan(0, 'O valor não pode ser zero')
    .required('O valor é obrigatório')
})

type FormData = {
  title: string
  description: string
  price: number
}

export default function NewCasePage({ params }: NewCasePageProps) {
  const router = useRouter()
  const { userId } = use(params)
  const { createCase, isLoading, errorCode } = useCreateInternalCase()

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
    }
  })

  const handleSubmit = async (data: FormData) => {
    const success = await createCase({
      ...data,
      clientId: userId,
    })

    if (success) {
      router.push(`/users/${userId}/cases/${success.id}/success`)
    }
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
          <h1 className="text-2xl font-semibold">Novo Caso</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Adicione um novo caso para o cliente
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Informações do Caso</CardTitle>
          <CardDescription>
            Preencha os dados do caso
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorCode && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                {getErrorMessage(errorCode)}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o título do caso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva os detalhes do caso"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          R$
                        </span>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="0,00"
                          className="pl-8"
                          {...field}

                        />
                      </div>
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
                      Criando caso...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Criar Caso
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