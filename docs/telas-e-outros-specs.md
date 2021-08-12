# Telas e outros specs

## Gestão de Pedidos

### Requisitos

- Criar novos pedidos
- Listar pedidos
- Listar resumo de pedidos (relatório?)
- Emitir cupom fiscal no fim do pedido
- Consultar cardápio atualizado

### Interfaces com Atores e fluxos

Proprietária Chef - Supervisão de pedidos
Caixa - Criação de pedidos

## Gestão de Estoque

### Requisitos

- Realizar pedidos de compra
- Dar baixa em produtos do estoque
- Alertar caso algum produto do estoque esteja com menos unidades que o desejável

### Interfaces com Atores e fluxos

Auxiliar Administrativo - Criação do pedido de compra
Auxiliar Arministrativo - Execução de baixa de estoque
Relógio - Supervisão de estoque

## Tela: Cadastrar Cliente

- Nome: input text
- CPF: input number
- Telefone: input phone
- Endereço: input text
- Número: input number
- Complemento: input text
- CEP: input number

## Tela: Criar Pedido

- Cliente: select list input text autocomplete search
- Novo: button
- Item n: select list input text autocomplete search
- Qtde n: input number
- Observação n: input text
- Adicionar mais items: button
