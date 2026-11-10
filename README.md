# Minhas Finanças — Prática de Implementação 2 (API REST)

App de finanças pessoais com CRUD de transações (entradas e saídas), autenticação e persistência remota no **PocketBase**.

## Credenciais

| Uso | E-mail | Senha |
|---|---|---|
| Admin do PocketBase (`http://127.0.0.1:8090/_/`) | `admin@minhasfinancas.com` | `admin12345` |
| Usuário do app | `teste@teste.com` | `12345678` |

Ambos são criados automaticamente pela migration na primeira execução do PocketBase.

## Como rodar

### 1. Backend (PocketBase)

Extraia o `pocketbase.zip` (ou use a pasta `pocketbase/`) e rode:

```bash
cd pocketbase
./pocketbase serve
```

Se o binário não for do seu sistema operacional, baixe o PocketBase em https://pocketbase.io/docs/ e coloque o executável dentro de `pocketbase/`.
Na primeira execução, a migration em `pb_migrations/` cria a coleção `transacoes`, as regras de acesso, o admin e o usuário de teste.

### 2. App

```bash
yarn install
npx expo start
```

A URL da API é escolhida automaticamente: `http://10.0.2.2:8090` no emulador Android e `http://localhost:8090` no web/iOS.
Para usar em um **celular físico**, crie um arquivo `.env` com o IP do computador na rede:

```bash
EXPO_PUBLIC_API_URL=http://192.168.0.10:8090
```

### 3. Testes

```bash
yarn test
```

## Coleção `transacoes`

| Campo | Tipo |
|---|---|
| `descricao` | text (obrigatório, máx. 100) |
| `valor` | number (obrigatório, > 0) |
| `tipo` | select: `entrada` \| `saida` |
| `user` | relation → `users` |
| `created` / `updated` | autodate |

Regras de API: cada usuário só lista, vê, cria, edita e exclui as **próprias** transações (`user = @request.auth.id`).

## Requisitos

| # | Requisito | Onde |
|---|---|---|
| 1 | Navegação com Expo Router (fluxo público e restrito) | `src/app/_layout.tsx` (`Stack.Protected`), `src/app/login.tsx`, `src/app/(app)/` |
| 2 | Autenticação com Context API | `src/contexts/AuthContext.tsx` (`login`, `logout`, `useAuth`) |
| 3 | Sessão persistida com AsyncStorage | `src/storage/session.ts`, restauração no `AuthContext` |
| 4 | Leitura com GET (Axios) | `src/services/transacoes.ts`, `src/app/(app)/index.tsx` |
| 5 | Criação (POST) e exclusão (DELETE) | `src/app/(app)/nova.tsx`, `handleDelete` em `src/app/(app)/index.tsx` |
| 6 | Edição (PATCH) | `src/app/(app)/editar/[id].tsx` |
| 7 | FlatList com `keyExtractor` e `ListEmptyComponent` | `src/app/(app)/index.tsx`, `src/components/EmptyList` |
| 8 | Loading (`ActivityIndicator`) e erros (`Alert.alert` / `alert` no web) | `src/components/LoadingView`, `FormButton` (`loading`), `src/utils/alert.ts`, `src/utils/errors.ts` |
| 9 | Estilização com `StyleSheet.create`, Flexbox e estilos separados | `src/components/*/styles.ts`, `src/theme` |
| 10 | Testes com Jest (4 suítes, 21 testes) | `__tests__/` |

## Estrutura

```
pocketbase/pb_migrations/   # coleção, regras, admin e usuário de teste
src/
├── app/                    # rotas do Expo Router
│   ├── _layout.tsx         # AuthProvider + rotas protegidas
│   ├── login.tsx
│   └── (app)/              # fluxo restrito
│       ├── index.tsx       # lista (GET / DELETE)
│       ├── nova.tsx        # POST
│       └── editar/[id].tsx # GET por id / PATCH
├── components/             # cada um com index.tsx + styles.ts
├── contexts/AuthContext.tsx
├── services/               # api.ts (Axios), auth.ts, transacoes.ts
├── storage/session.ts      # AsyncStorage
├── theme/
├── types/
└── utils/                  # alert, errors, format, validation
__tests__/
```
