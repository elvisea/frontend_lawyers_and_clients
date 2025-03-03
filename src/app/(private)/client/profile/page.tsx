'use client'

import { useRouter } from 'next/navigation'
import { Edit, Loader2, Plus, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'

import { formatDateToBR } from '@/utils/date'
import { ErrorCode } from '@/enums/error-code'
import { useClientProfile } from '@/hooks/use-client-profile'

export default function ClientProfilePage() {
  const router = useRouter()
  const { profile, isLoading, errorCode } = useClientProfile()

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
    return (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="text-center space-y-4 max-w-[500px]">
          <h2 className="text-xl font-semibold">Perfil não encontrado</h2>
          <p className="text-muted-foreground">
            Você ainda não criou seu perfil. Complete seu cadastro para começar a usar a plataforma.
          </p>
          <Button onClick={() => router.push('/client/profile/create')}>
            <Plus className="h-4 w-4" />
            Criar Perfil
          </Button>
        </div>
      </div>
    )
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
            <h1 className="text-2xl font-semibold">Meu Perfil</h1>
          </div>
          <Button onClick={() => router.push('/client/profile/edit')}>
            <Edit className="hidden sm:block h-4 w-4 sm:mr-2" />
            Editar Perfil
          </Button>
        </div>

        {/* Informações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium">CPF</h3>
                <p className="text-sm text-muted-foreground">{profile?.cpf}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium">RG</h3>
                <p className="text-sm text-muted-foreground">{profile?.rg}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium">Data de Nascimento</h3>
                <p className="text-sm text-muted-foreground">
                  {profile?.birthDate && formatDateToBR(profile.birthDate)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium">Profissão</h3>
                <p className="text-sm text-muted-foreground">{profile?.occupation}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium">Telefone</h3>
              <p className="text-sm text-muted-foreground">{profile?.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {profile?.address.street}, {profile?.address.number}
              {profile?.address.complement && ` - ${profile.address.complement}`}
              <br />
              {profile?.address.neighborhood}
              <br />
              {profile?.address.city} - {profile?.address.state}
              <br />
              CEP: {profile?.address.zipCode}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 