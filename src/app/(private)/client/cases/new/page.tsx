'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ErrorMessage } from '@/components/ErrorMessage';

import api from '@/http/api';

import { Form } from './types';
import { schema } from './constants';
import { AppError } from '@/errors/app-error';
import { ErrorCode } from '@/enums/error-code';

export default function NewCasePage() {
  const router = useRouter();

  const [error, setError] = useState('');
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  console.log('🚨 [NewCasePage] errorCode:', errorCode)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },

    setValue,
    watch,
  } = useForm<Form>({ resolver: yupResolver(schema), defaultValues: { documents: [{ type: '', file: null }] } });

  const { fields, append, remove } = useFieldArray<Form>({
    control,
    name: 'documents',
  });

  const documents = watch('documents'); // Observa os valores dos documentos

  const handleCreateCase = async (data: Form) => {
    setError('');

    // Filtra os documentos válidos (com file e type preenchidos)
    const validDocuments = documents?.filter(
      (doc) => doc.file && doc.type.trim()
    );

    console.log('📄 Documentos válidos:', validDocuments);

    // Verifica se há pelo menos um documento válido
    if (validDocuments?.length === 0) {
      setError('Adicione pelo menos um documento com nome e arquivo.');
      console.error('❌ Nenhum documento válido encontrado.');
      return;
    }

    try {
      // 1. Primeiro criar o caso
      console.log('🔄 Criando caso...');
      const { data: newCase } = await api.post('/cases', {
        title: data.title.trim(),
        description: data.description.trim(),
      });
      console.log('✅ Caso criado com sucesso:', newCase);

      // 2. Depois envia os documentos utilizando FormData
      const formDataUpload = new FormData();

      // Adiciona os arquivos e tipos ao FormData de forma coordenada
      validDocuments?.forEach((doc) => {
        formDataUpload.append('files', doc.file as File);
        formDataUpload.append('types', doc.type.trim());
      });

      console.log('📦 FormData preparado:', formDataUpload);

      // Envia os documentos para a API com os headers necessários
      console.log('🚀 Enviando documentos...');
      await api.post(`/documents/${newCase.id}`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('🎉 Documentos enviados com sucesso!');

      // Redireciona para a página de casos
      router.push('/client/cases');
    } catch (error) {
      console.error('❌ Erro ao criar caso:', error);
      setError('Erro ao criar o caso. Tente novamente.');

      if (error instanceof AppError) {
        setErrorCode(error.errorCode)
      } else {
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }
    }
  };

  const handleAddDocumentField = () => {
    append({ type: '', file: null });
    console.log('➕ Novo campo de documento adicionado.');
  };

  const handleRemoveDocumentField = (index: number) => {
    remove(index);
    console.log('➖ Campo de documento removido:', index);
  };

  const handleFileChange = (index: number, file: File | undefined) => {
    setValue(`documents.${index}.file`, file as File); // Atualiza o valor do campo file
    console.log('📂 Arquivo selecionado:', file?.name);
  };

  const handleBack = () => {
    router.push('/client/cases');
    console.log('🔙 Voltando para a lista de casos.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Novo Caso</h1>
      </div>

      <form onSubmit={handleSubmit(handleCreateCase)} className="space-y-8">
        {/* Informações Básicas */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do caso*</Label>
            <Input
              {...register('title')}
              id="title"
              type="text"
              name="title"
              placeholder="Digite um título descritivo"
            />
            {errors.title?.message && (
              <ErrorMessage message={errors.title.message} />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição*</Label>
            <Textarea
              {...register('description')}
              id="description"
              name="description"
              className="min-h-[120px]"
              placeholder="Descreva os detalhes do seu caso"
            />
            {errors.description?.message && (
              <ErrorMessage message={errors.description.message} />
            )}
          </div>
        </div>

        {/* Documentos */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="font-medium mb-2">Sobre os Documentos</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Os documentos são essenciais para dar suporte ao seu caso. Eles
                servem como evidências que ajudam os advogados a entender melhor
                sua situação e fortalecer seus argumentos.
              </p>
              <p>Exemplos de documentos úteis:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Contratos e acordos relevantes</li>
                <li>Registros de comunicação (e-mails, mensagens)</li>
                <li>Comprovantes de pagamento</li>
                <li>Fotos ou vídeos relacionados</li>
                <li>Documentos pessoais quando necessário</li>
              </ul>
              <p className="text-primary font-medium">
                Importante: Todos os documentos são tratados com confidencialidade e
                só serão acessados por profissionais autorizados.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Documentos*</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddDocumentField}
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Documento
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-4 items-start p-4 rounded-lg border bg-muted/40"
                >
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Nome do documento"
                      {...register(`documents.${index}.type`, {
                        required: "O nome do documento é obrigatório",
                      })}
                    />
                    {(errors.documents?.[index]?.type as { message?: string } | undefined)?.message && (
                      <ErrorMessage
                        message={(errors.documents?.[index]?.type as { message?: string })?.message || ''}
                      />
                    )}

                    <Input
                      type="file"
                      onChange={(e) =>
                        handleFileChange(index, e.target.files?.[0])
                      }
                      className="cursor-pointer file:text-foreground dark:file:text-foreground text-foreground dark:text-foreground/70"
                    />
                    {errors.documents?.[index]?.file?.message && (
                      <ErrorMessage message={errors.documents[index].file?.message} />
                    )}
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveDocumentField(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {/* Ações */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={handleBack}>
            Cancelar
          </Button>
          <Button type="submit">
            <Plus className="h-4 w-4 mr-2" />
            Criar Caso
          </Button>
        </div>
      </form>
    </div>
  );
}