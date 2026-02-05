# Sistema de Chamados – Frontend

Frontend em React + Vite + TypeScript para o backend de gestão de chamados (NestJS). Implementa autenticação JWT e CRUD de tickets consumindo a API REST.

## Objetivo
- Realizar login/registro de usuários e manter sessão via token.
- Listar, detalhar, criar e editar tickets do usuário.
- Aplicar regras de acesso conforme o backend (exclusão só admin; edição pelo dono ou admin, validado no backend).

## Stack
- React + Vite + TypeScript
- Axios para chamadas HTTP
- React Router para navegação

## Estrutura
- `src/lib/`  
  - `api.ts`: cliente Axios com injeção automática de `Authorization: Bearer <token>`.  
  - `types.ts`: tipos de respostas/payloads.  
  - `auth.tsx`: contexto de autenticação (carrega `/auth/me`, faz login/registro/logout).  
  - `config.ts`: configuração central (API_URL e chave do token).
- `src/pages/`  
  - `Login.tsx` e `Register.tsx`  
  - `TicketsList.tsx`, `TicketDetail.tsx`, `TicketForm.tsx`
- `src/routes/`  
  - `ProtectedRoute.tsx`: proteção de rotas para usuários logados.
- `src/components/`  
  - `NavBar.tsx`
- `src/App.tsx`, `src/main.tsx`: definição das rotas e providers.

## Escolhas de Arquitetura
- Separação em camadas simples (lib/pages/routes/components) para clareza e manutenção.
- Contexto de autenticação isolado: facilita reuso e controle de sessão.
- Tipos centralizados (`types.ts`): evita `any` e ajuda no autocompletar.
- Interceptor de Axios: mantém o token fora das páginas e reduz repetição.
- Rotas protegidas: garante navegação segura sem duplicar verificações.

## Desenvolvimento
- Backend: `http://localhost:3000`
- Dev server do frontend: `http://localhost:5173` (ou `5174` se a porta estiver ocupada)
- Proxy de desenvolvimento (Vite) configurado para evitar CORS:
  - `vite.config.ts` proxia `'/auth'` e `'/tickets'` para `http://localhost:3000`
  - O `api.ts` usa `baseURL = '/'` em desenvolvimento

### Scripts
- `npm run dev`: inicia servidor de desenvolvimento
- `npm run build`: build de produção
- `npm run preview`: preview do build
- `npm run lint`: checagem de lint

## Produção
- Defina `VITE_API_URL` para apontar ao backend, por exemplo:
  - `VITE_API_URL="https://api.seudominio.com"`
- O `config.ts` usa `VITE_API_URL` quando disponível; caso contrário, `'/‘` (adequado com proxy ativo).
- Em produção, configure CORS no backend ou sirva ambos sob o mesmo domínio (reverse proxy).

## Configuração
- Requisitos:
  - Node.js 18+ (recomendado 20+)
  - Backend NestJS rodando em `http://localhost:3000`
- Variáveis de ambiente:
  - Desenvolvimento com proxy: não é necessário definir `VITE_API_URL`
  - Sem proxy ou produção: criar `.env` com `VITE_API_URL`
    - Exemplo:
      ```
      VITE_API_URL=https://api.seudominio.com
      ```
- Proxy de desenvolvimento (já configurado):
  - [vite.config.ts](sistema-chamados-frontend/vite.config.ts) redireciona `'/auth'` e `'/tickets'` para `http://localhost:3000`
  - Se o backend estiver em outra porta/host, ajuste `target` no proxy

## Inicialização
- Instalação:
  ```
  npm install
  ```
- Desenvolvimento:
  ```
  npm run dev
  ```
  - Acesse `http://localhost:5173` (ou outra porta se 5173 estiver ocupada)
- Build de produção:
  ```
  npm run build
  ```
- Preview do build:
  ```
  npm run preview
  ```

## Fluxos da Aplicação
- Registro (`POST /auth/register`) e Login (`POST /auth/login`) retornam `access_token`.
- O token é salvo em `localStorage` e usado automaticamente no interceptor.
- `/auth/me` valida a sessão e carrega `role` (`user`|`admin`).
- Tickets:
  - `POST /tickets` cria
  - `GET /tickets` lista do usuário
  - `GET /tickets/:id` detalha
  - `PUT /tickets/:id` edita (validado pelo backend)
  - `DELETE /tickets/:id` exclui (apenas admin)

## Notas
- Erros e mensagens são tratados de forma simples nas páginas; é possível integrar uma biblioteca de toasts para UX melhor.
- A autorização final é garantida pelo backend; o frontend apenas orienta a navegação.
