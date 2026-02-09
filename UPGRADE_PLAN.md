# Plano de Upgrade - ByteBurger

## 📋 Visão Geral

Este documento detalha o plano completo de modernização do sistema **ByteBurger**, transformando-o de um protótipo funcional em uma solução produtiva completa para hamburguerias.

### 🎯 Objetivos Principais
- Personalização real de itens (ingredientes, extras, remoções)
- Integração de pagamento real com Stripe
- Acompanhamento de pedidos em tempo real
- Melhorias na experiência do usuário (busca, histórico, comunicação)

### 🛠️ Stack Tecnológico Escolhido
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Pagamento**: Stripe
- **Comunicação Real-time**: Socket.io (WebSocket)
- **Frontend**: React 18 + TypeScript + Vite (existente)

---

## 🏗️ Fases de Implementação

### FASE 1: Fundação Backend (Semanas 1-2)
**Prioridade**: Alta  
**Status**: 🔴 Não iniciado

#### Objetivos
- Estabelecer infraestrutura de API robusta
- Implementar modelos de dados escaláveis
- Criar autenticação e autorização
- Preparar integração com frontend existente

#### Tarefas Específicas
1. **Setup do Backend**
   - [ ] Inicializar projeto Node.js com TypeScript
   - [ ] Configurar Express com middlewares (helmet, cors, rate-limit)
   - [ ] Configurar logging (winston ou pino)
   - [ ] Implementar tratamento de erros centralizado
   - [ ] Configurar variáveis de ambiente (.env)

2. **Database Setup**
   - [ ] Configurar PostgreSQL (local/dev)
   - [ ] Instalar e configurar Prisma ORM
   - [ ] Criar schema inicial com modelos core
   - [ ] Implementar migrations
   - [ ] Configurar seed data para desenvolvimento

3. **Autenticação**
   - [ ] Implementar JWT authentication
   - [ ] Criar middleware de proteção de rotas
   - [ ] Setup de refresh tokens
   - [ ] Validação de sessões

#### Entregáveis
- API REST funcional
- Banco de dados PostgreSQL configurado
- Schema Prisma com modelos core
- Documentação de endpoints básicos

#### Arquitetura Esperada
```
/server
├── src/
│   ├── config/          # Configurações (DB, env)
│   ├── controllers/     # Lógica dos endpoints
│   ├── middleware/      # Auth, validation, errors
│   ├── models/          # Interfaces/types
│   ├── routes/          # Definição de rotas
│   ├── services/        # Business logic
│   └── utils/           # Helpers
├── prisma/
│   └── schema.prisma    # Database schema
└── tests/               # Testes unitários
```

---

### FASE 2: Personalização de Itens (Semana 2)
**Prioridade**: Alta  
**Status**: 🔴 Não iniciado

#### Objetivos
- Permitir clientes personalizarem itens do cardápio
- Calcular preços dinamicamente baseado em customizações
- Interface intuitiva para seleção de ingredientes

#### Tarefas Específicas
1. **Modelagem de Dados**
   - [ ] Criar modelo `Ingredient` no Prisma
   - [ ] Criar modelo `CustomizationOption` no Prisma
   - [ ] Atualizar modelo `MenuItem` com relações
   - [ ] Adicionar campo `preparationTime` nos itens
   - [ ] Criar tabela de associação item-ingrediente

2. **Backend API**
   - [ ] Endpoint GET /api/menu/:id/ingredients
   - [ ] Endpoint GET /api/menu/:id/customizations
   - [ ] Endpoint POST /api/orders (atualizado para aceitar customizações)
   - [ ] Lógica de cálculo de preço com customizações
   - [ ] Validação de combinações permitidas

3. **Frontend - Componentes**
   - [ ] Criar `ItemCustomizationSheet.tsx`
   - [ ] Componente de seleção de ingredientes
   - [ ] Componente de opções extras
   - [ ] Visualização de preço atualizado em tempo real
   - [ ] Campo de observações por item

4. **Estado do Carrinho**
   - [ ] Atualizar `CartItem` type com customizações
   - [ ] Modificar Zustand store para persistir customizações
   - [ ] Lógica de agrupamento de itens iguais com customizações diferentes
   - [ ] Cálculo de subtotal, taxas e total

#### Entregáveis
- Sistema de personalização funcional
- Cálculo dinâmico de preços
- UI de customização integrada ao cardápio
- Carrinho atualizado para lidar com variações

#### Exemplo de Fluxo
```typescript
// Customização de um hambúrguer
{
  itemId: "burger-001",
  quantity: 2,
  removedIngredients: ["onions", "pickles"],
  addedCustomizations: [
    { id: "extra-cheese", name: "Queijo Extra", price: 3.00, quantity: 1 },
    { id: "bacon", name: "Bacon", price: 5.00, quantity: 2 }
  ],
  notes: "Bem passado, por favor",
  totalPrice: 47.00  // Preço base + customizações
}
```

---

### FASE 3: Integração de Pagamento Real (Semanas 2-3)
**Prioridade**: Alta  
**Status**: 🔴 Não iniciado

#### Objetivos
- Substituir simulação por processamento real de pagamentos
- Integrar Stripe para pagamentos seguros
- Suportar múltiplos métodos de pagamento
- Garantir compliance PCI DSS

#### Tarefas Específicas
1. **Setup Stripe**
   - [ ] Criar conta Stripe (test mode)
   - [ ] Configurar chaves de API no .env
   - [ ] Instalar SDK Stripe (server e client)
   - [ ] Configurar webhooks para eventos de pagamento

2. **Backend - Payment Service**
   - [ ] Implementar `StripeService` class
   - [ ] Endpoint POST /api/payments/intent
   - [ ] Endpoint POST /api/payments/webhook
   - [ ] Lógica de confirmação de pagamento
   - [ ] Tratamento de falhas e reembolsos
   - [ ] Modelo de Payment no database

3. **Frontend - Integração**
   - [ ] Instalar @stripe/stripe-js e @stripe/react-stripe-js
   - [ ] Criar `PaymentForm.tsx` component
   - [ ] Integrar Stripe Elements
   - [ ] Implementar fluxo de erro e retry
   - [ ] Tela de sucesso/falha do pagamento

4. **Métodos de Pagamento**
   - [ ] Cartão de crédito/débito (Stripe)
   - [ ] PIX (via Stripe ou integração alternativa)
   - [ ] Dinheiro (registro manual no sistema)

#### Entregáveis
- Sistema de pagamento real funcional
- Processamento seguro com Stripe
- Webhook handlers para eventos
- Fluxo completo de checkout com erro handling

#### Arquitetura de Pagamento
```typescript
// Fluxo de pagamento
1. Cliente finaliza carrinho
2. Backend cria Payment Intent (Stripe)
3. Frontend recebe client_secret
4. Cliente insere dados de pagamento
5. Stripe processa o pagamento
6. Webhook confirma sucesso/falha
7. Backend atualiza status do pedido
8. Notificação real-time para cliente
```

---

### FASE 4: Tracking em Tempo Real (Semana 3)
**Prioridade**: Média-Alta  
**Status**: 🔴 Não iniciado

#### Objetivos
- Implementar comunicação bidirecional cliente-cozinha
- Notificações instantâneas de mudanças de status
- Painel de acompanhamento visual do pedido
- Tempo estimado dinâmico baseado em fila

#### Tarefas Específicas
1. **WebSocket Server**
   - [ ] Integrar Socket.io ao servidor Express
   - [ ] Configurar namespaces (/orders, /kitchen)
   - [ ] Implementar autenticação de sockets
   - [ ] Setup de rooms por pedido
   - [ ] Handler de eventos (status-change, kitchen-update)

2. **Backend - Lógica de Status**
   - [ ] Enum de OrderStatus (pending, confirmed, preparing, ready, delivered, cancelled)
   - [ ] Service para atualização de status
   - [ ] Cálculo de tempo estimado baseado em:
     - Quantidade de itens
     - Complexidade (customizações)
     - Fila atual da cozinha
     - Histórico de tempos
   - [ ] Broadcast de atualizações para clients conectados

3. **Frontend - Real-time Client**
   - [ ] Criar `SocketService` para gerenciar conexão
   - [ ] Implementar `useSocket` hook
   - [ ] Criar `OrderTracking.tsx` component
   - [ ] Indicador visual de progresso (stepper)
   - [ ] Display de tempo estimado atualizado
   - [ ] Notificações toast de mudanças

4. **Kitchen Dashboard (para staff)**
   - [ ] Interface da cozinha (separada)
   - [ ] Lista de pedidos ativos ordenados por prioridade
   - [ ] Botões para atualizar status
   - [ ] Timer de preparação
   - [ ] Notificações de novos pedidos

#### Entregáveis
- WebSocket server funcional
- Sistema de status em tempo real
- Painel de tracking para clientes
- Dashboard básico para cozinha
- Notificações push de atualizações

#### Estados do Pedido
```typescript
enum OrderStatus {
  PENDING = 'pending',           // Aguardando confirmação de pagamento
  CONFIRMED = 'confirmed',       // Pagamento confirmado
  PREPARING = 'preparing',       // Cozinha iniciou preparação
  READY = 'ready',              // Pedido pronto para entrega
  DELIVERED = 'delivered',      // Entregue ao cliente
  CANCELLED = 'cancelled'       // Pedido cancelado
}

// Status transitions com timestamps
// Cada mudança gera notificação WebSocket
```

---

### FASE 5: Features Adicionais (Semanas 4-5)
**Prioridade**: Média  
**Status**: 🔴 Não iniciado

#### 5.1 Busca e Filtros Avançados

**Objetivos**
- Permitir busca rápida no cardápio
- Filtros por categoria, preço, restrições alimentares
- Sugestões de busca

**Tarefas**
- [ ] Endpoint de busca full-text (PostgreSQL)
- [ ] Componente `SearchBar.tsx` com autocomplete
- [ ] Filtros: vegetariano, vegano, sem glúten, sem lactose
- [ ] Filtros por faixa de preço
- [ ] Ordenação (preço, popularidade, nome)

#### 5.2 Histórico de Pedidos e Perfil

**Objetivos**
- Persistir histórico de pedidos do cliente
- Permitir repetição de pedidos anteriores
- Perfil básico do usuário

**Tarefas**
- [ ] Modelo `User` no database
- [ ] Sistema de identificação do cliente (anonimizado ou com dados)
- [ ] Endpoint GET /api/users/:id/orders
- [ ] Componente `OrderHistory.tsx`
- [ ] Funcionalidade "Pedir Novamente"
- [ ] Armazenar preferências (favoritos)

#### 5.3 Modificação de Pedidos Ativos

**Objetivos**
- Permitir alterações em pedidos não finalizados
- Cancelamento de itens
- Adição de itens extras
- Rastreamento de modificações

**Tarefas**
- [ ] Modelo `OrderModification` no Prisma
- [ ] Regras de negócio (até quando pode modificar)
- [ ] Endpoint PUT /api/orders/:id/modify
- [ ] UI para adicionar/cancelar itens
- [ ] Cálculo de diferenciais de preço
- [ ] Notificação para cozinha de modificações

#### 5.4 Comunicação com Staff

**Objetivos**
- Chat simples entre cliente e funcionários
- Chamada de garçom
- Reportar problemas

**Tarefas**
- [ ] Modelo `Message` no database
- [ ] WebSocket events para mensagens
- [ ] Componente `StaffChat.tsx`
- [ ] Botão de "Chamar Garçom"
- [ ] Templates de mensagens rápidas
- [ ] Notificações para staff dashboard

#### 5.5 Melhorias UX/UI

**Tarefas**
- [ ] Skeleton screens durante loading
- [ ] Animações de transição suaves
- [ ] Empty states informativos
- [ ] Toast notifications
- [ ] Confirmações antes de ações destrutivas
- [ ] Offline detection e fallback
- [ ] Acessibilidade (ARIA labels, keyboard nav)

---

## 📊 Database Schema Detalhado

### Modelos Principais

```prisma
// User/Customer
model User {
  id          String    @id @default(cuid())
  email       String?   @unique
  phone       String?   @unique
  name        String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  orders      Order[]
  sessions    Session[]
}

// Restaurant
model Restaurant {
  id          String     @id @default(cuid())
  name        String
  slug        String     @unique
  settings    Json?      // Configurações personalizadas
  tables      Table[]
  menuItems   MenuItem[]
  orders      Order[]
  staff       Staff[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

// Tables
model Table {
  id            String     @id @default(cuid())
  number        Int
  qrCode        String     @unique
  status        TableStatus @default(AVAILABLE)
  restaurantId  String
  restaurant    Restaurant @relation(fields: [restaurantId], references: [id])
  orders        Order[]
  createdAt     DateTime   @default(now())
  
  @@unique([restaurantId, number])
}

// Menu Items
model MenuItem {
  id              String              @id @default(cuid())
  name            String
  description     String?
  price           Decimal             @db.Decimal(10, 2)
  image           String?
  category        Category
  popular         Boolean             @default(false)
  available       Boolean             @default(true)
  preparationTime Int                 @default(15) // minutes
  ingredients     MenuItemIngredient[]
  customizations  CustomizationOption[]
  restaurantId    String
  restaurant      Restaurant          @relation(fields: [restaurantId], references: [id])
  orderItems      OrderItem[]
  createdAt       DateTime            @default(now())
  updatedAt       DateTime            @updatedAt
}

// Ingredients for each menu item
model Ingredient {
  id          String                @id @default(cuid())
  name        String
  price       Decimal               @default(0) @db.Decimal(10, 2)
  optional    Boolean               @default(false)
  menuItems   MenuItemIngredient[]
  createdAt   DateTime              @default(now())
}

model MenuItemIngredient {
  id            String     @id @default(cuid())
  menuItemId    String
  ingredientId  String
  menuItem      MenuItem   @relation(fields: [menuItemId], references: [id])
  ingredient    Ingredient @relation(fields: [ingredientId], references: [id])
  isDefault     Boolean    @default(true)
  removable     Boolean    @default(true)
  
  @@unique([menuItemId, ingredientId])
}

// Customization Options
model CustomizationOption {
  id         String   @id @default(cuid())
  name       String
  type       CustomizationType
  price      Decimal  @default(0) @db.Decimal(10, 2)
  maxQuantity Int     @default(1)
  menuItemId String
  menuItem   MenuItem @relation(fields: [menuItemId], references: [id])
  createdAt  DateTime @default(now())
}

// Orders
model Order {
  id              String              @id @default(cuid())
  orderNumber     String              @unique
  status          OrderStatus         @default(PENDING)
  paymentStatus   PaymentStatus       @default(PENDING)
  paymentId       String?             // Stripe payment intent ID
  subtotal        Decimal             @db.Decimal(10, 2)
  tax             Decimal             @default(0) @db.Decimal(10, 2)
  tip             Decimal             @default(0) @db.Decimal(10, 2)
  total           Decimal             @db.Decimal(10, 2)
  notes           String?
  estimatedTime   Int?                // minutes
  createdAt       DateTime            @default(now())
  updatedAt       DateTime            @updatedAt
  confirmedAt     DateTime?
  preparingAt     DateTime?
  readyAt         DateTime?
  deliveredAt     DateTime?
  cancelledAt     DateTime?
  
  // Relations
  userId          String?
  user            User?               @relation(fields: [userId], references: [id])
  tableId         String
  table           Table               @relation(fields: [tableId], references: [id])
  restaurantId    String
  restaurant      Restaurant          @relation(fields: [restaurantId], references: [id])
  items           OrderItem[]
  modifications   OrderModification[]
  messages        Message[]
}

// Order Items (with customizations)
model OrderItem {
  id                  String   @id @default(cuid())
  quantity            Int
  unitPrice           Decimal  @db.Decimal(10, 2)
  totalPrice          Decimal  @db.Decimal(10, 2)
  notes               String?
  
  // Customizations stored as JSON
  removedIngredients  String[] // IDs of removed ingredients
  addedCustomizations Json?    // Array of { id, name, price, quantity }
  
  orderId             String
  order               Order    @relation(fields: [orderId], references: [id])
  menuItemId          String
  menuItem            MenuItem @relation(fields: [menuItemId], references: [id])
  
  @@index([orderId])
}

// Order Modifications
model OrderModification {
  id          String   @id @default(cuid())
  type        ModificationType
  description String
  priceDiff   Decimal  @default(0) @db.Decimal(10, 2)
  createdAt   DateTime @default(now())
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id])
}

// Messages (Staff-Customer Chat)
model Message {
  id          String   @id @default(cuid())
  content     String
  senderType  SenderType
  senderId    String?
  createdAt   DateTime @default(now())
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id])
  
  @@index([orderId])
}

// Sessions for JWT
model Session {
  id        String   @id @default(cuid())
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
}

// Enums
enum Category {
  BURGERS
  SIDES
  DRINKS
  DESSERTS
}

enum TableStatus {
  AVAILABLE
  OCCUPIED
  RESERVED
  CLEANING
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  READY
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
}

enum CustomizationType {
  ADDITION
  REMOVAL
  SUBSTITUTION
}

enum ModificationType {
  ADD_ITEM
  REMOVE_ITEM
  CHANGE_QUANTITY
  CANCEL_ORDER
}

enum SenderType {
  CUSTOMER
  STAFF
  SYSTEM
}
```

---

## 🔌 API Endpoints

### Menu
```http
GET    /api/menu                    # Get all menu items for restaurant
GET    /api/menu/search?q={query}   # Search menu items
GET    /api/menu/:id                # Get specific item with ingredients & customizations
```

### Orders
```http
POST   /api/orders                  # Create new order
GET    /api/orders/:id              # Get order details
PUT    /api/orders/:id              # Update order (modifications)
DELETE /api/orders/:id              # Cancel order
GET    /api/orders/:id/status       # Get real-time status
```

### Payments
```http
POST   /api/payments/intent         # Create Stripe payment intent
POST   /api/payments/webhook        # Stripe webhook handler
GET    /api/payments/:id/status     # Check payment status
```

### Tables
```http
GET    /api/tables/:qrCode          # Get table info by QR code
```

### Users
```http
GET    /api/users/profile           # Get user profile
PUT    /api/users/profile           # Update profile
GET    /api/users/orders            # Get order history
```

### WebSocket Events
```javascript
// Client -> Server
join-order        { orderId: string }
leave-order       { orderId: string }
chat-message      { orderId: string, content: string }

// Server -> Client
order-status-changed    { orderId: string, status: OrderStatus, timestamp: Date }
order-modified          { orderId: string, modification: OrderModification }
chat-message            { orderId: string, message: Message }
kitchen-update          { orderId: string, update: string }
```

---

## 🎨 Componentes Frontend a Desenvolver

### Novos Componentes

#### 1. ItemCustomizationSheet
- **Localização**: `/src/components/ItemCustomizationSheet.tsx`
- **Props**: `item: MenuItem, open: boolean, onClose: () => void, onAdd: (customizedItem: CartItem) => void`
- **Funcionalidade**: Modal/bottom sheet para personalizar itens antes de adicionar ao carrinho
- **Features**:
  - Lista de ingredientes com checkbox para remoção
  - Opções extras com controle de quantidade
  - Campo de observações
  - Cálculo de preço em tempo real
  - Preview visual das alterações

#### 2. PaymentForm
- **Localização**: `/src/components/PaymentForm.tsx`
- **Props**: `clientSecret: string, amount: number, onSuccess: () => void, onError: (error: string) => void`
- **Funcionalidade**: Formulário de pagamento integrado com Stripe Elements
- **Features**:
  - Campos de cartão seguros (Stripe-hosted)
  - Opção PIX (se disponível)
  - Loading states
  - Tratamento de erros
  - Confirmação visual

#### 3. OrderTracking
- **Localização**: `/src/components/OrderTracking.tsx`
- **Props**: `orderId: string`
- **Funcionalidade**: Painel de acompanhamento do pedido com updates em tempo real
- **Features**:
  - Timeline/stepper de status
  - Tempo estimado dinâmico
  - Animações de progresso
  - Notificações toast
  - Botão de chat com staff

#### 4. SearchBar
- **Localização**: `/src/components/SearchBar.tsx`
- **Props**: `onSearch: (query: string) => void, suggestions?: MenuItem[]`
- **Funcionalidade**: Barra de busca com autocomplete
- **Features**:
  - Input de busca com debounce
  - Sugestões em dropdown
  - Histórico de buscas recentes
  - Filtros rápidos

#### 5. OrderHistory
- **Localização**: `/src/components/OrderHistory.tsx`
- **Props**: `userId: string`
- **Funcionalidade**: Lista de pedidos anteriores
- **Features**:
  - Cards de pedidos com resumo
  - Botão "Pedir Novamente"
  - Paginação/infinite scroll
  - Filtros por data/status

#### 6. StaffChat
- **Localização**: `/src/components/StaffChat.tsx`
- **Props**: `orderId: string, isOpen: boolean`
- **Funcionalidade**: Interface de chat entre cliente e funcionários
- **Features**:
  - Lista de mensagens
  - Input rápido
  - Templates de mensagens
  - Indicador de "digitando"

#### 7. CategoryFilter
- **Localização**: `/src/components/CategoryFilter.tsx`
- **Props**: `categories: Category[], activeCategory: string, onChange: (category: string) => void`
- **Funcionalidade**: Tabs de categorias melhoradas
- **Features**:
  - Rolagem horizontal suave
  - Contador de itens por categoria
  - Ícones visuais
  - Filtros adicionais (populares, promoções)

### Hooks Customizados

#### useSocket
```typescript
// /src/hooks/useSocket.ts
export function useSocket(orderId: string) {
  // Gerencia conexão WebSocket
  // Retorna: status, emit, on, disconnect
}
```

#### useOrderStatus
```typescript
// /src/hooks/useOrderStatus.ts
export function useOrderStatus(orderId: string) {
  // Retorna status atual, tempo estimado, histórico de mudanças
}
```

#### useSearch
```typescript
// /src/hooks/useSearch.ts
export function useSearch() {
  // Gerencia busca com debounce
  // Retorna: query, results, isLoading, error
}
```

---

## 🔄 Fluxo Completo do Sistema

### Fluxo do Cliente

```
1. ENTRADA
   └── QR Code escaneado
       └── /?mesa=5&restaurante=abc123
           └── Validação de mesa/restaurante
               └── Identificação anônima ou login
                   └── Cache do cardápio

2. CARDÁPIO
   └── Carrega categorias e itens
       └── Busca e filtros disponíveis
           └── Toque em item
               └── Sheet de personalização abre
                   └── Seleção de ingredientes/opções
                       └── Cálculo de preço em tempo real
                           └── Adiciona ao carrinho

3. CARRINHO
   └── Revisão dos itens
       └── Ajuste de quantidades
           └── Campo de observações gerais
               └── Botão "Finalizar Pedido"
                   └── Transição para checkout

4. CHECKOUT
   └── Resumo completo do pedido
       └── Seleção de método de pagamento
           └── Processamento com Stripe
               └── Sucesso → Confirmação
                   └── Falha → Retry ou método alternativo

5. ACOMPANHAMENTO
   └── Comprovante com número do pedido
       └── Conexão WebSocket estabelecida
           └── Updates em tempo real
               └── Notificações de status
                   └── Chat disponível se necessário
                       └── Pedido entregue

6. PÓS-PEDIDO
   └── Opção de avaliação
       └── Pedido salvo no histórico
           └── Sugestão para novo pedido
```

### Fluxo da Cozinha (Staff)

```
1. NOVO PEDIDO
   └── Notificação sonora/visual
       └── Pedido aparece na fila
           └── Priorização automática

2. PREPARAÇÃO
   └── Aceita pedido
       └── Timer inicia
           └── Status muda para "Preparando"
               └── Cliente notificado em tempo real

3. FINALIZAÇÃO
   └── Marca como "Pronto"
       └── Notificação enviada ao cliente
           └── Aguarda retirada/entrega

4. ENTREGA
   └── Confirma entrega
       └── Pedido arquivado
           └── Analytics atualizados
```

---

## 🛡️ Considerações de Segurança

### Autenticação e Autorização
- **JWT Tokens**: Acesso seguro à API
- **Refresh Tokens**: Renovação automática de sessão
- **Rate Limiting**: Prevenção de ataques brute force
- **Input Validation**: Sanitização de todos os inputs

### Pagamentos (PCI DSS)
- **Stripe Elements**: Campos de cartão seguros (Stripe-hosted)
- **Tokenização**: Nunca armazenar dados de cartão
- **Webhooks**: Validação de assinatura Stripe
- **HTTPS**: Obrigatório para todas as comunicações

### Proteção de Dados
- **Senhas**: Hash com bcrypt (salt 12+)
- **Dados Sensíveis**: Encriptação no database
- **Logs**: Nunca logar dados de pagamento
- **CORS**: Whitelist de domínios permitidos

### Infraestrutura
- **Helmet.js**: Headers de segurança HTTP
- **Helmet**: Proteção contra vulnerabilidades comuns
- **ENV**: Nunca commitar secrets
- **Dependencies**: Auditoria regular de vulnerabilidades

---

## 📈 Performance e Escalabilidade

### Otimizações Planejadas

#### Database
- **Indexes**: orderNumber, tableId, userId, status
- **Connection Pooling**: 10-20 conexões
- **Query Optimization**: Evitar N+1 queries
- **Caching**: Redis para sessões e cache de cardápio

#### Frontend
- **Lazy Loading**: Componentes pesados carregados sob demanda
- **Image Optimization**: Next-Gen formats (WebP), lazy loading
- **Code Splitting**: Routes separadas em chunks
- **PWA**: Service worker para offline capability

#### Backend
- **Caching**: Redis para queries frequentes
- **CDN**: Assets estáticos (CloudFlare/AWS CloudFront)
- **Horizontal Scaling**: State-less API design
- **WebSocket Optimization**: Rooms por pedido, não broadcast geral

### Métricas de Performance

| Métrica | Meta |
|---------|------|
| Time to First Byte (TTFB) | <200ms |
| API Response Time | <200ms (p95) |
| WebSocket Connection | <1s |
| Initial Page Load | <2s |
| Image Load | <500ms |
| Payment Processing | <3s |

---

## 🧪 Testes

### Estratégia de Testes

#### Unit Tests (Vitest)
- [ ] Services de backend
- [ ] Utilitários e helpers
- [ ] Cálculos de preço
- [ ] Validações

#### Integration Tests
- [ ] API endpoints
- [ ] Database operations
- [ ] WebSocket events
- [ ] Stripe webhooks

#### E2E Tests (Playwright/Cypress)
- [ ] Fluxo completo de pedido
- [ ] Processo de pagamento (test mode)
- [ ] Real-time updates
- [ ] Responsividade mobile

#### Load Tests (k6/Artillery)
- [ ] 100 usuários simultâneos
- [ ] 1000 pedidos/hora
- [ ] WebSocket connections
- [ ] Database queries

### Cobertura Mínima
- Backend: 80%+
- Frontend: 60%+
- Critical paths: 100%

---

## 🚀 Deployment

### Ambientes

```
Development (local)
├── Docker Compose (PostgreSQL + Redis)
├── Stripe Test Mode
└── Hot reload

Staging
├── Railway/Render
├── PostgreSQL (produção-like)
├── Stripe Test Mode
└── SSL habilitado

Production
├── Railway/Render/VPS
├── PostgreSQL (produção)
├── Stripe Live Mode
├── CDN configurado
└── Monitoring (Sentry/LogRocket)
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
1. Lint & Type Check
2. Unit Tests
3. Integration Tests
4. Build
5. Deploy to Staging
6. E2E Tests on Staging
7. Deploy to Production
8. Smoke Tests
```

### Checklist Pre-Deploy
- [ ] Todas as variáveis de ambiente configuradas
- [ ] Migrations rodadas
- [ ] Seeds aplicados (se necessário)
- [ ] Stripe webhook endpoints configurados
- [ ] SSL certificados válidos
- [ ] Backups configurados
- [ ] Monitoring ativo
- [ ] Documentação atualizada

---

## 📋 Checklist de Implementação

### Fase 1: Backend Foundation
- [ ] Setup projeto Node.js + Express + TypeScript
- [ ] Configurar ESLint + Prettier
- [ ] Setup Docker Compose (PostgreSQL + Redis)
- [ ] Instalar e configurar Prisma
- [ ] Criar schema inicial
- [ ] Implementar middlewares (auth, error, validation)
- [ ] Setup logging
- [ ] Criar endpoints básicos
- [ ] Testes unitários iniciais

### Fase 2: Personalização
- [ ] Atualizar schema Prisma (Ingredientes, Customizações)
- [ ] Criar endpoints de menu detalhado
- [ ] Desenvolver ItemCustomizationSheet
- [ ] Atualizar CartItem type
- [ ] Modificar Zustand store
- [ ] Integrar com backend
- [ ] Testes de integração

### Fase 3: Pagamento
- [ ] Criar conta Stripe
- [ ] Configurar Stripe SDK
- [ ] Implementar StripeService
- [ ] Criar PaymentForm component
- [ ] Setup webhooks
- [ ] Fluxo de erro e retry
- [ ] Testes end-to-end

### Fase 4: Real-time
- [ ] Integrar Socket.io
- [ ] Implementar SocketService
- [ ] Criar OrderTracking component
- [ ] Setup rooms por pedido
- [ ] Notificações toast
- [ ] Kitchen dashboard básico
- [ ] Testes de carga WebSocket

### Fase 5: Features Adicionais
- [ ] Implementar busca full-text
- [ ] Criar SearchBar component
- [ ] Setup perfil de usuário
- [ ] OrderHistory component
- [ ] Modificação de pedidos
- [ ] StaffChat component
- [ ] Melhorias de UX
- [ ] Acessibilidade

### Finalização
- [ ] Documentação completa
- [ ] Testes E2E
- [ ] Performance audit
- [ ] Security audit
- [ ] Deploy staging
- [ ] User acceptance testing
- [ ] Deploy production
- [ ] Monitoramento e alerts

---

## 📞 Recursos e Referências

### Documentação Oficial
- [Stripe Documentation](https://stripe.com/docs)
- [Socket.io Documentation](https://socket.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Query Documentation](https://tanstack.com/query/latest)

### Ferramentas Recomendadas
- **API Testing**: Postman / Insomnia
- **Database GUI**: TablePlus / pgAdmin
- **WebSocket Testing**: WebSocket King Client
- **Monitoring**: Sentry / LogRocket
- **Analytics**: Google Analytics / Mixpanel

### Comunidades
- Stripe Discord
- React Discord
- Prisma Slack

---

## 📝 Notas e Decisões

### Decisões Arquiteturais
1. **Monorepo**: Separar `/client` e `/server` no mesmo repo
2. **REST API**: Usar REST ao invés de GraphQL (simplicidade)
3. **PostgreSQL**: Escolha pela robustez e recursos avançados
4. **Socket.io**: Abstração sobre WebSocket puro
5. **Stripe**: Escolha por simplicidade e documentação

### Considerações Futuras
- **Multi-tenancy**: Suporte a múltiplos restaurantes no mesmo código
- **Mobile App**: React Native com expo
- **Analytics Dashboard**: Metabase ou similar
- **Loyalty Program**: Pontos por pedidos
- **Delivery Integration**: iFood, Uber Eats APIs

### Débitos Técnicos Conhecidos
- Validação de QR code pode ser mais robusta
- Cache de cardápio pode expirar mais rápido que updates
- WebSocket reconnection logic básica

---

## 📅 Timeline Estimada

| Fase | Semanas | Status |
|------|---------|--------|
| 1. Backend Foundation | 2 | 🔴 Não iniciado |
| 2. Personalização | 1 | 🔴 Não iniciado |
| 3. Pagamento | 1 | 🔴 Não iniciado |
| 4. Real-time | 1 | 🔴 Não iniciado |
| 5. Features Adicionais | 2 | 🔴 Não iniciado |
| **Total** | **7 semanas** | **~2 meses** |

---

## ✅ Aprovação

**Data de Criação**: 2026-02-02  
**Versão**: 1.0  
**Autor**: Development Team  
**Status**: Draft

---

**Próximo Passo**: Priorizar Fase 1 e iniciar setup do backend.