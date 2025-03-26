# JusMatch - Plataforma de Conexão Jurídica

Plataforma que conecta clientes a advogados especializados, facilitando a gestão de casos jurídicos e documentos.

## 🚀 Tecnologias

- [Next.js 15](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)

## 📋 Pré-requisitos

- Node.js 22+
- Docker e Docker Compose
- PNPM

## 🔧 Configuração do Ambiente

1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd [nome-do-repositorio]
```

2. Instale as dependências
```bash
pnpm install
```

3. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Configure as seguintes variáveis:
CONTAINER_NAME_APP=frontend_lawyers_and_clients

NEXT_PUBLIC_API_URL=http://localhost:3334
NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:3334/payments

# Configurações do Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=JusMatch
NEXT_PUBLIC_SITE_DESCRIPTION="Plataforma jurídica que conecta clientes a advogados especializados..."
```

## 🚀 Executando o Projeto

### Desenvolvimento

```bash
# Desenvolvimento local
pnpm dev

# Com Docker
docker compose -f docker-compose.dev.yml up
```

### Produção

```bash
# Build
pnpm build

# Com Docker
docker compose up -d
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Rotas e páginas
│   ├── (private)/         # Rotas autenticadas
│   ├── (public)/          # Rotas públicas
│   └── landing/           # Landing pages
├── components/            # Componentes React
├── contexts/             # Contextos React
├── hooks/                # Custom Hooks
└── types/                # Tipos TypeScript
```

## 🔒 Rotas Protegidas

- `/client/*` - Área do cliente
- `/lawyer/*` - Área do advogado
- `/(private)/*` - Rotas autenticadas
- `/(staff)/*` - Área administrativa

## 📤 Deploy

O deploy é automatizado via GitHub Actions e utiliza Docker. O pipeline inclui:

1. Build da aplicação
2. Testes (quando configurados)
3. Build da imagem Docker
4. Push para Docker Hub
5. Deploy no servidor de produção

## 🤝 Contribuindo

1. Crie uma branch para sua feature
```bash
git checkout -b feat/nome-da-feature
```

2. Commit suas mudanças
```bash
git commit -m "feat: adiciona nova funcionalidade"
```

3. Push para a branch
```bash
git push origin feat/nome-da-feature
```

4. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE).

## 👥 Autores

* **[Nome do Autor]** - *Trabalho Inicial* - [GitHub](link-do-github)

## 📮 Contato

Para suporte ou dúvidas sobre o projeto, entre em contato através de [email@exemplo.com]
