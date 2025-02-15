```c4
# Contexto (Nível 1)
System_Boundary("E-commerce System", "Plataforma de E-commerce") {
    Person("Cliente", "Usuário que navega, adiciona produtos ao carrinho e finaliza compras.")
    Person("Administrador", "Usuário que gerencia produtos, pedidos e clientes.")
    System("Gateway de Pagamento", "Serviço terceirizado para processar pagamentos.")
    System("Serviço de Notificação", "Envia emails e notificações para clientes.")
}

# Contêiner (Nível 2)
System_Boundary("E-commerce System") {
    Container("Web App", "React", "Interface do usuário para clientes e administradores.")
    Container("API Backend", "Node.js + Express", "Lida com lógica de negócio e comunicação com o banco de dados.")
    Container("Banco de Dados", "PostgreSQL", "Armazena dados dos produtos, pedidos e clientes.")
    Container_Ext("Gateway de Pagamento", "Stripe/PayPal", "Processa pagamentos online.")
    Container("Serviço de Notificação", "Node.js + Firebase", "Gerencia envio de emails e notificações push.")
}

# Componentes (Nível 3)
Container_Boundary("API Backend") {
    Component("Auth Service", "JWT", "Gerencia autenticação e autorização de usuários.")
    Component("Product Service", "Node.js", "Gerencia listagem e detalhes dos produtos.")
    Component("Order Service", "Node.js", "Gerencia pedidos e processos de checkout.")
    Component_Ext("Payment Service", "Stripe SDK", "Interage com o Gateway de Pagamento para processar transações.")
    Component("Cart Service", "Redis", "Gerencia o carrinho de compras de forma rápida e eficiente.")
    Component("Notification Service", "Firebase SDK", "Envia emails e notificações push para os clientes.")
}
```



```c4
# Contexto (Nível 1)
System_Boundary("E-commerce System", "Plataforma de E-commerce baseada em Microserviços") 
{
    Person("Cliente", "Usuário que navega, adiciona produtos ao carrinho e finaliza compras.")
    Person("Administrador", "Usuário que gerencia produtos, pedidos e clientes.")
    System("Gateway de Pagamento", "Serviço terceirizado para processar pagamentos.")
    System("Serviço de Notificação", "Envia emails e notificações para clientes.")
}

# Contêiner (Nível 2)
System_Boundary("E-commerce System") 
{
    Container("Web App", "React", "Interface do usuário para clientes e administradores.")
    Container("API Gateway", "NGINX", "Orquestra chamadas para os microserviços.")
    Container("Auth Service", "Node.js + JWT", "Gerencia autenticação e autorização de usuários.")
    Container("Product Service", "Node.js", "Gerencia listagem e detalhes dos produtos.")
    Container("Order Service", "Node.js", "Gerencia pedidos e processos de checkout.")
    Container("Cart Service", "Redis", "Gerencia o carrinho de compras de forma rápida e eficiente.")
    Container("Payment Service", "Node.js + Stripe SDK", "Interage com o Gateway de Pagamento para processar transações.")
    Container("Notification Service", "Node.js + Firebase", "Envia emails e notificações push para os clientes.")
    Container("Banco de Dados", "PostgreSQL", "Armazena dados dos produtos, pedidos e clientes.")
}

# Componentes (Nível 3)
Container_Boundary("API Gateway") 
{
    Component("Request Router", "NGINX", "Encaminha requisições para os serviços apropriados.")
}

Container_Boundary("Auth Service") 
{
    Component("Token Manager", "JWT", "Gera e valida tokens de autenticação.")
    Component("User Database", "MongoDB", "Armazena informações dos usuários.")
}

Container_Boundary("Product Service") 
{
    Component("Product Catalog", "Node.js", "Gerencia listagem e detalhes dos produtos.")
    Component("Product Database", "PostgreSQL", "Armazena informações dos produtos.")
}

Container_Boundary("Order Service") 
{
    Component("Order Processor", "Node.js", "Gerencia pedidos e status de checkout.")
    Component("Order Database", "PostgreSQL", "Armazena informações dos pedidos.")
}

Container_Boundary("Cart Service") 
{
    Component("Cart Manager", "Redis", "Gerencia os itens temporários no carrinho.")
}

Container_Boundary("Payment Service") 
{
    Component("Payment Processor", "Stripe SDK", "Processa pagamentos online.")
}

Container_Boundary("Notification Service") 
{
    Component("Email Sender", "Firebase SDK", "Envia notificações por email.")
    Component("Push Notifier", "Firebase SDK", "Envia notificações push.")
}
```

# ADR Template: Registro de Decisão Arquitetural

## Título
[Identificação única e descritiva da decisão]

## Contexto
[Descrição do problema ou necessidade que levou à decisão]

## Decisão
[Explicação clara da decisão tomada]

## Consequências
✅ [Impactos positivos da decisão]
❌ [Impactos negativos da decisão]

## Alternativas Consideradas
1. **[Alternativa 1]**
   - [Motivo pelo qual foi considerada e descartada]
   
2. **[Alternativa 2]**
   - [Motivo pelo qual foi considerada e descartada]

## Próximos Passos
- [Ações necessárias para implementar a decisão]



# ADR 001: Adoção de Arquitetura de Microserviços

## Contexto
A plataforma de e-commerce está crescendo rapidamente, exigindo maior escalabilidade, flexibilidade e resiliência. A arquitetura monolítica existente apresenta desafios, como dificuldades na manutenção, problemas de escalabilidade e forte acoplamento entre componentes. Para garantir uma melhor distribuição de carga, escalabilidade horizontal e facilitar o desenvolvimento independente de funcionalidades, avaliamos a adoção de uma arquitetura baseada em microserviços.

## Decisão
Adotaremos uma arquitetura baseada em microserviços, onde diferentes funcionalidades do e-commerce (autenticação, catálogo de produtos, pedidos, carrinho, pagamentos e notificações) serão implementadas como serviços independentes, comunicando-se via API Gateway e protocolos como REST ou mensagens assíncronas (RabbitMQ/Kafka).

## Consequências
✅ **Escalabilidade**: Cada serviço pode ser escalado individualmente conforme a demanda.
✅ **Flexibilidade Tecnológica**: Possibilidade de utilizar diferentes tecnologias para diferentes serviços.
✅ **Resiliência**: Falhas em um serviço não afetam necessariamente os outros.
✅ **Manutenção e Desenvolvimento Independente**: Equipes podem trabalhar em diferentes serviços de forma independente.

❌ **Complexidade**: Gerenciamento de múltiplos serviços aumenta a complexidade operacional.
❌ **Latência**: Comunicação entre serviços pode introduzir latência adicional.
❌ **Monitoramento e Depuração**: Requer ferramentas avançadas para observabilidade e rastreamento distribuído.

## Alternativas Consideradas
1. **Arquitetura Monolítica**
   - 🚫 Descartada devido à dificuldade de escalar individualmente diferentes partes do sistema.
   
2. **Arquitetura Modular (Monólito Modular)**
   - 🚫 Considerada, mas não totalmente adotada, pois ainda mantém forte acoplamento entre módulos.
   
3. **Serverless (FaaS - Functions as a Service)**
   - 🚫 Avaliada, mas descartada devido à dependência de provedores cloud e dificuldades em fluxos de longa duração.

## Próximos Passos
- Definir estratégias de comunicação entre microserviços (REST vs. Mensageria).
- Implementar um API Gateway (NGINX/Kong/Apigee) para orquestração de requisições.
- Adotar ferramentas de monitoramento (Prometheus, Grafana, Jaeger) para rastreamento distribuído.
- Criar pipelines de CI/CD para facilitar a entrega contínua de cada serviço.


# ADR 002: Escolha do Banco de Dados

## Contexto
A plataforma de e-commerce exige um banco de dados confiável, escalável e adequado para lidar com diferentes tipos de dados, como informações de usuários, produtos, pedidos e transações de pagamento. O banco de dados escolhido deve oferecer suporte a transações ACID, boa performance em consultas complexas e escalabilidade.

## Decisão
Optamos por utilizar **PostgreSQL** como o banco de dados principal do sistema. Ele será responsável por armazenar dados estruturados relacionados a usuários, produtos, pedidos e transações financeiras.

## Consequências
✅ **Suporte a transações ACID**: Garantia de integridade dos dados.
✅ **Escalabilidade**: Suporte a replicação e particionamento para escalabilidade horizontal.
✅ **Flexibilidade**: Excelente suporte a JSON para armazenar dados semiestruturados.
✅ **Segurança**: Recursos avançados de segurança e controle de acesso.

❌ **Curva de aprendizado**: Pode exigir mais conhecimento para otimização e administração.
❌ **Uso de recursos**: Pode ser mais exigente em consumo de memória e CPU em comparação com bancos NoSQL.

## Alternativas Consideradas
1. **MongoDB (NoSQL)**
   - 🚫 Descartado devido à falta de suporte nativo a transações complexas.
   
2. **MySQL**
   - 🚫 Considerado, mas PostgreSQL foi escolhido por melhor suporte a concorrência e JSON.
   
3. **DynamoDB (AWS NoSQL)**
   - 🚫 Avaliado, mas descartado devido à necessidade de um modelo relacional mais estruturado.

## Próximos Passos
- Configurar a infraestrutura de banco de dados com alta disponibilidade e replicação.
- Implementar backups automáticos e estratégias de recuperação de desastres.
- Monitorar desempenho e otimizar índices conforme necessário.



# ADR 004: Modelo de Contêiner do C4

## Contexto
A arquitetura do sistema de e-commerce segue o modelo C4 para garantir uma visão clara da estrutura e das interações dos contêineres. No nível de contêineres, precisamos definir como os principais serviços do sistema serão organizados, comunicados e implantados.

## Decisão
Adotamos um modelo baseado em microserviços, onde cada funcionalidade principal do sistema será representada por um contêiner independente. A comunicação entre contêineres ocorrerá via API Gateway e filas de mensagens assíncronas.

Os principais contêineres definidos são:
- **Web App (React)**: Interface do usuário para clientes e administradores.
- **API Gateway (NGINX)**: Orquestra chamadas para os microserviços.
- **Auth Service (Node.js + JWT)**: Gerencia autenticação e autorização.
- **Product Service (Node.js + PostgreSQL)**: Gerencia catálogo de produtos.
- **Order Service (Node.js + PostgreSQL)**: Gerencia pedidos e checkout.
- **Cart Service (Redis)**: Gerencia o carrinho de compras.
- **Payment Service (Node.js + Stripe SDK)**: Processa pagamentos.
- **Notification Service (Node.js + Firebase)**: Envia notificações para clientes.

## Consequências
✅ **Modularidade**: Facilidade de manutenção e desenvolvimento independente.
✅ **Escalabilidade**: Cada contêiner pode ser escalado conforme necessário.
✅ **Isolamento**: Falhas em um serviço não impactam diretamente os demais.
✅ **Flexibilidade tecnológica**: Possibilidade de usar diferentes tecnologias para cada serviço.

❌ **Complexidade**: Requer um bom gerenciamento de comunicação e monitoramento.
❌ **Sobrehead operacional**: Necessidade de gerenciar múltiplos serviços e infraestrutura distribuída.

## Alternativas Consideradas
1. **Monólito**
   - 🚫 Descartado devido à baixa escalabilidade e forte acoplamento.
   
2. **Arquitetura modular (Monólito Modular)**
   - 🚫 Considerado, mas não adotado por ainda manter dependências internas fortes.

## Próximos Passos
- Definir estratégias de comunicação entre os microserviços (REST vs. Mensageria).
- Implementar monitoramento e logging distribuído para rastrear interações entre contêineres.
- Ajustar a infraestrutura para suportar deploy contínuo e escalabilidade dinâmica.
