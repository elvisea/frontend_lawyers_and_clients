'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Loader2, Save, ArrowLeft } from 'lucide-react'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TagInput } from '@/components/ui/tag-input'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

import api from '@/http/api'
import { ErrorCode } from '@/enums/error-code'
import { useLawyerProfile } from '@/hooks/use-lawyer-profile'
import { profileSchema, type ProfileFormData } from '../schema'

export default function EditProfilePage() {
  const router = useRouter()
  const { profile, isLoading, errorCode } = useLawyerProfile()

  const form = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      phone: profile?.phone || '',
      description: profile?.description || '',
      yearsOfExp: profile?.yearsOfExp || 0,
      education: profile?.education || '',
      oab: {
        number: profile?.oab?.number || '',
        state: profile?.oab?.state || '',
      },
      address: {
        street: profile?.address?.street || '',
        number: profile?.address?.number || '',
        city: profile?.address?.city || '',
        state: profile?.address?.state || '',
        zipCode: profile?.address?.zipCode || '',
        complement: profile?.address?.complement || '',
        neighborhood: profile?.address?.neighborhood || '',
      },
      specialties: profile?.specialties || [],
      certificates: profile?.certificates || [],
    }
  })

  const handleSubmit = async (data: ProfileFormData) => {
    try {
      await api.put('/lawyers/profile', data)
      router.push('/lawyer/profile')
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      alert('Erro ao atualizar perfil. Tente novamente.')
    }
  }

  useEffect(() => {
    if (profile) {
      form.reset({
        phone: profile.phone,
        description: profile.description,
        yearsOfExp: profile.yearsOfExp,
        education: profile.education,
        oab: {
          number: profile.oab.number,
          state: profile.oab.state,
        },
        address: {
          street: profile.address.street,
          number: profile.address.number,
          city: profile.address.city,
          state: profile.address.state,
          zipCode: profile.address.zipCode,
          complement: profile.address.complement || '',
          neighborhood: profile.address.neighborhood,
        },
        specialties: profile.specialties,
        certificates: profile.certificates,
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

  if (errorCode === ErrorCode.LAWYER_PROFILE_NOT_FOUND) {
    router.push('/lawyer/profile')
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
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+5511987654321"
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
                      <FormLabel>Descrição Profissional</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva sua experiência..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="yearsOfExp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anos de Experiência</FormLabel>
                        <FormControl>
                          <Input min={0} type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Formação</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Bacharel em Direito" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* OAB */}
            <Card>
              <CardHeader>
                <CardTitle>Registro OAB</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="oab.number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="oab.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="SP" maxLength={2} {...field} />
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
                          <Input {...field} />
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

            {/* Especialidades e Certificações */}
            <Card>
              <CardHeader>
                <CardTitle>Especialidades e Certificações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="specialties"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especialidades</FormLabel>
                      <FormControl>
                        <TagInput
                          value={field.value?.filter((item): item is string => Boolean(item)) ?? []}
                          onChange={field.onChange}
                          placeholder="Digite uma especialidade..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="certificates"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificações</FormLabel>
                      <FormControl>
                        <TagInput
                          value={field.value?.filter((item): item is string => Boolean(item)) ?? []}
                          onChange={field.onChange}
                          placeholder="Digite uma certificação..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  )
} 