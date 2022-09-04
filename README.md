# Cadastro de Carro
**Requisitos Funcionais**
  - Deve ser possível cadastrar um novo carro
  - Deve ser possível listar todas as categorias

**Regras de Negócio**
- Não deve ser possível cadastrar um carro com uma placa já existente
- Não deve ser possível alterar a placa de uma carro já cadastrado
- O carro deve ser cadastrado como disponibilidade por padrão
- Não deve ser possível o cadastro de carros por usuários não administradores
  
# Listagem de Carros
**Requisitos Funcionais**
- Deve ser possível a listagem de todos os carros disponíveis
- Deve ser possível a listagem de todos os carros disponíveis por marca
- Deve ser possível a listagem de todos os carros disponíveis por categoria
- Deve ser possível a listagem de todos os carros disponíveis pelo nome do carro
  
**Regras de Negócio**
- Deve ser possível listar os carros sem estar autenticado
  
# Cadastro de Especificação no carro
**Requisitos Funcionais**
- Deve ser possível cadastrar uma especificação para um carro
- Deve ser possível listar todas as especificações
- Deve ser possível lista todos os carros
- Não deve ser possível o cadastro de especificações por usuários não administradores

**Regras de Negócio**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro

# Cadastro de Imagens no carro
**Requisitos Funcionais**
- Deve ser possível cadastrar imagem
- Deve ser possível listar todos os carros

**Requisitos Não Funcionais**
- As imagens devem ser salvas na S3 da AWS

**Regras de Negócio**
- Deve ser possível cadastrar diversas imagens para o mesmo carro
- Não deve ser possível o cadastro de imagens por usuários não administradores

# Aluguel de carro
**Requisitos Funcionais**
- Deve ser possível cadastrar um aluguel

**Requisitos Não Funcionais**
- As imagens devem ser salvas na S3 da AWS

**Regras de Negócio**
- O aluguel deve conter duração mínima de 1 dia
- O aluguel deve iniciar após as próximas 24 horas
- Não deve ser possível cadastrar um aluguel caso já exista um para a mesma pessoa
- Não deve ser possível cadastrar um aluguel caso já exista um para o mesmo carro

