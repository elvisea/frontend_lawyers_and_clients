'use client'

import { useState, useRef } from 'react'
import { Upload, FileUp, Loader2 } from 'lucide-react'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { DocumentFormData } from '@/hooks/use-case-documents'

interface DocumentFormProps {
  onSubmit: (data: DocumentFormData) => Promise<void>
  isUploading: boolean
}

const formSchema = yup.object({
  type: yup.string().required('Selecione o tipo de documento'),
  customType: yup.string().when('type', {
    is: 'Outro',
    then: (schema) => schema.required('Informe o tipo de documento'),
    otherwise: (schema) => schema.notRequired(),
  }),
  file: yup
    .mixed<File>()
    .required('Selecione um arquivo')
    .test('fileSize', 'O arquivo deve ter no máximo 10MB', (value) => {
      if (!value) return true
      return (value as File).size <= 10 * 1024 * 1024
    })
    .test('fileType', 'Formato de arquivo não suportado', (value) => {
      if (!value) return true
      const acceptedFormats = [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'audio/mpeg',
        'audio/wav',
        'audio/ogg',
        'video/mp4',
        'video/quicktime',
        'video/webm',
      ]
      return acceptedFormats.includes((value as File).type)
    }),
})

interface ExtendedDocumentFormData extends DocumentFormData {
  customType?: string;
}

export function DocumentForm({ onSubmit, isUploading }: DocumentFormProps) {
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ExtendedDocumentFormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      type: '',
      customType: '',
      file: undefined as unknown as File,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      form.setValue('file', file)
    }
  }

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
    form.setValue('type', value)
  }

  const handleSubmit = async (data: ExtendedDocumentFormData) => {
    // Se for tipo personalizado, use o valor do campo customType
    const finalType = data.type === 'Outro' ? data.customType! : data.type

    await onSubmit({
      type: finalType,
      file: data.file
    })

    // Reset do formulário após envio bem-sucedido
    form.reset({
      type: '',
      customType: '',
      file: undefined as unknown as File,
    })
    setSelectedType('')
    setSelectedFile(null)
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Documento</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={handleTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Documentos Pessoais</SelectLabel>
                        <SelectItem value="Documento de Identidade">Documento de Identidade</SelectItem>
                        <SelectItem value="CPF">CPF</SelectItem>
                        <SelectItem value="Passaporte">Passaporte</SelectItem>
                        <SelectItem value="Comprovante de Endereço">Comprovante de Endereço</SelectItem>
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel>Documentos Legais</SelectLabel>
                        <SelectItem value="Contrato">Contrato</SelectItem>
                        <SelectItem value="Boletim de Ocorrência">Boletim de Ocorrência</SelectItem>
                        <SelectItem value="Processo Judicial">Processo Judicial</SelectItem>
                        <SelectItem value="Procuração">Procuração</SelectItem>
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel>Documentos Financeiros</SelectLabel>
                        <SelectItem value="Recibo/Comprovante">Recibo/Comprovante</SelectItem>
                        <SelectItem value="Comprovante de Pagamento">Comprovante de Pagamento</SelectItem>
                        <SelectItem value="Nota Fiscal">Nota Fiscal</SelectItem>
                        <SelectItem value="Extrato Bancário">Extrato Bancário</SelectItem>
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel>Documentos Médicos</SelectLabel>
                        <SelectItem value="Laudo Médico">Laudo Médico</SelectItem>
                        <SelectItem value="Exame Médico">Exame Médico</SelectItem>
                        <SelectItem value="Receita Médica">Receita Médica</SelectItem>
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel>Evidências Digitais</SelectLabel>
                        <SelectItem value="Conversa de Chat">Conversa de Chat</SelectItem>
                        <SelectItem value="Conversa de WhatsApp">Conversa de WhatsApp</SelectItem>
                        <SelectItem value="E-mail">E-mail</SelectItem>
                        <SelectItem value="Print de Tela">Print de Tela</SelectItem>
                        <SelectItem value="Fotografia">Fotografia</SelectItem>
                        <SelectItem value="Áudio">Áudio</SelectItem>
                        <SelectItem value="Vídeo">Vídeo</SelectItem>
                      </SelectGroup>

                      <SelectItem value="Outro">Outro (Especificar)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedType === 'Outro' && (
            <FormField
              control={form.control}
              name="customType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especifique o tipo de documento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex: Declaração de Testemunha, Certidão, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="file"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Arquivo</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleFileButtonClick}
                        className="flex items-center gap-2"
                      >
                        <FileUp className="h-4 w-4" />
                        Escolher Arquivo
                      </Button>
                      <span className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-full">
                        {selectedFile ? selectedFile.name : 'Nenhum arquivo selecionado'}
                      </span>
                    </div>
                    <input
                      {...field}
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.wav,.ogg,.mp4,.mov,.webm"
                      className="hidden"
                    />
                    {selectedFile && (
                      <p className="text-xs text-muted-foreground">
                        Tamanho: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    )}
                  </div>
                </FormControl>
                <p className="text-xs text-muted-foreground mt-1">
                  Formatos aceitos: PDF, DOC, DOCX, JPG, PNG, MP3, WAV, MP4, MOV. Tamanho máximo: 10MB
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isUploading || !selectedFile || !selectedType || (selectedType === 'Outro' && !form.watch('customType'))}
              className="w-full sm:w-auto"
            >
              Enviar Documento
              {isUploading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Upload className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 