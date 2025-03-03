'use client'

import { ArrowRight, Loader2 } from 'lucide-react'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { CaseFormData, useCreateCase } from '@/hooks/use-create-case'

const formSchema = yup.object({
  title: yup.string()
    .required('O título é obrigatório')
    .min(5, 'O título deve ter pelo menos 5 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),

  description: yup.string()
    .required('A descrição é obrigatória')
    .min(20, 'A descrição deve ter pelo menos 20 caracteres')
    .max(2000, 'A descrição deve ter no máximo 2000 caracteres')
})

export function CaseForm() {
  const { createCase, navigateToDocuments, isLoading, errorCode } = useCreateCase()

  const form = useForm<CaseFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  const handleSubmit = async (data: CaseFormData) => {
    const createdCase = await createCase(data)

    if (createdCase) {
      navigateToDocuments(createdCase.id)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Caso</CardTitle>
            <CardDescription>
              Forneça os detalhes básicos sobre seu caso jurídico
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Caso</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Disputa de guarda de filhos"
                      {...field}
                    />
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
                  <FormLabel>Descrição do Caso</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva seu caso em detalhes, incluindo datas, pessoas envolvidas e o que você espera conseguir..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {errorCode && (
              <div className="text-sm font-medium text-destructive">{errorCode}</div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            Continuar para Documentos
            {isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </Form>
  )
} 