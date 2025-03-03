'use client'

import { useRouter } from 'next/navigation'
import { Edit, Loader2, Plus, ArrowLeft } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'

import { ErrorCode } from '@/enums/error-code'
import { useLawyerProfile } from '@/hooks/use-lawyer-profile'

export default function LawyerProfilePage() {
  const router = useRouter()

  const { profile, isLoading, errorCode } = useLawyerProfile()

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
    return (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="text-center space-y-4 max-w-[500px]">
          <h2 className="text-xl font-semibold">Perfil não encontrado</h2>
          <p className="text-muted-foreground">
            Você ainda não criou seu perfil profissional. Complete seu cadastro para começar a receber casos.
          </p>
          <Button onClick={() => router.push('/lawyer/profile/create')}>
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
          <Button onClick={() => router.push('/lawyer/profile/edit')}>
            <Edit className="hidden sm:block h-4 w-4 sm:mr-2" />
            Editar Perfil
          </Button>
        </div>

        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Telefone</h3>
              <p className="text-sm text-muted-foreground">{profile?.phone}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium">Descrição Profissional</h3>
              <p className="text-sm text-muted-foreground">{profile?.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium">Anos de Experiência</h3>
                <p className="text-sm text-muted-foreground">{profile?.yearsOfExp} anos</p>
              </div>

              <div>
                <h3 className="text-sm font-medium">Formação</h3>
                <p className="text-sm text-muted-foreground">{profile?.education}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OAB */}
        <Card>
          <CardHeader>
            <CardTitle>Registro OAB</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium">Número</h3>
              <p className="text-sm text-muted-foreground">{profile?.oab.number}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium">Estado</h3>
              <p className="text-sm text-muted-foreground">{profile?.oab.state}</p>
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

        {/* Especialidades e Certificações */}
        <Card>
          <CardHeader>
            <CardTitle>Especialidades e Certificações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Especialidades</h3>
              <div className="flex flex-wrap gap-2">
                {profile?.specialties.map((specialty) => (
                  <Badge className="px-3 py-1.5 h-7 cursor-pointer hover:bg-secondary/80" key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Certificações</h3>
              <div className="flex flex-wrap gap-2">
                {profile?.certificates.map((certificate) => (
                  <Badge className="px-3 py-1.5 h-7 cursor-pointer hover:bg-secondary/80" key={certificate} variant="secondary">
                    {certificate}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 