'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Loader2, Save, ArrowLeft } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

import api from '@/http/api'
import { ErrorCode } from '@/enums/error-code'
import { useClientProfile } from '@/hooks/use-client-profile'
import { profileSchema, type ProfileFormData } from '../schema'
import { formatDateToISO, formatDateToBR } from '@/utils/date'
import Logger from '@/utils/logger'
export default function EditProfilePage() {
  const router = useRouter()
  const { profile, isLoading, errorCode } = useClientProfile()

  const form = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      cpf: profile?.cpf || '',
      rg: profile?.rg || '',
      birthDate: profile?.birthDate || '',
      occupation: profile?.occupation || '',
      phone: profile?.phone || '',
      address: {
        street: profile?.address?.street || '',
        number: profile?.address?.number || '',
        city: profile?.address?.city || '',
        state: profile?.address?.state || '',
        zipCode: profile?.address?.zipCode || '',
        complement: profile?.address?.complement || '',
        neighborhood: profile?.address?.neighborhood || '',
      },
    }
  })

  const handleSubmit = async (data: ProfileFormData) => {
    try {
      const formattedData = {
        ...data,
        birthDate: formatDateToISO(data.birthDate)
      }

      await api.put('/clients/profile', formattedData)

      Logger.info('Perfil atualizado com sucesso', {
        prefix: 'Perfil',
        data: {
          ...data
        }
      })
      
      router.push('/client/profile')
    } catch (error) {

      Logger.error('Erro ao atualizar perfil', {
        prefix: 'Perfil',
        error,
        data: {
          ...data
        }
      })

      alert('Erro ao atualizar perfil. Tente novamente.')
    }
  }

  useEffect(() => {
    if (profile) {
      form.reset({
        cpf: profile.cpf,
        rg: profile.rg,
        birthDate: formatDateToBR(profile.birthDate),
        occupation: profile.occupation,
        phone: profile.phone,
        address: {
          street: profile.address.street,
          number: profile.address.number,
          city: profile.address.city,
          state: profile.address.state,
          zipCode: profile.address.zipCode,
          complement: profile.address.complement || '',
          neighborhood: profile.address.neighborhood,
        },
      })
    }
  }, [profile, form])

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  if (errorCode === ErrorCode.CLIENT_PROFILE_NOT_FOUND) {
    router.push('/client/profile')
    return null
  }

  if (errorCode === ErrorCode.UNKNOWN_ERROR) {
    return (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Erro inesperado</h2>
          <p className="text-muted-foreground">Não foi possível carregar seu perfil. Tente novamente mais tarde.</p>
          <Button variant="outline" onClick={() => router.refresh()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center px-2 sm:px-6">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold">Editar Perfil</h1>
          </div>
          <Button onClick={form.handleSubmit(handleSubmit)}>
            <Save className="hidden sm:block h-4 w-4 sm:mr-2" />
            Salvar Alterações
          </Button>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            {/* Informações Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input placeholder="123.456.789-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RG</FormLabel>
                        <FormControl>
                          <Input placeholder="12.345.678-9" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="DD/MM/AAAA"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profissão</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Engenheiro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="11987654321" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Endereço */}
            <Card>
              <CardHeader>
                <CardTitle>Endereço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rua</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 grid-cols-2">
                    <FormField
                      control={form.control}
                      name="address.number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.complement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complemento</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="address.neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input placeholder="01234-567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input maxLength={2} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  )
} 