# Desafio Técnico - Target Sistemas

Este projeto foi desenvolvido para o desafio técnico da **Target Sistemas**. O projeto consiste em uma aplicação Full Stack que gerencia comissões, estoque e cálculos financeiros, integrando um frontend em Angular com uma API RESTful em NestJS.

![Angular](https://img.shields.io/badge/angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## 📋 Sobre o Projeto

O sistema foi construído em dois serviços principais:

- **Backend (NestJS):** Responsável pela lógica de negócios, cálculos de juros/comissões e gerenciamento de dados.
- **Frontend (Angular):** Interface de usuário estilizada para consumo e visualização dos dados da API.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Angular
- **Backend:** NestJS
- **Infraestrutura:** Docker e Docker Compose

## ⚙️ Pré-requisitos

Para executar este projeto, você precisa ter instalado em seu computador:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 📦 Como Rodar o Projeto

A aplicação foi configurada para ser executada com um único comando, que subirá tanto o frontend quanto o backend.

1. Rode o comando para construir e iniciar os serviços:

   ```bash
   docker-compose up -d --build
   ```

2. Após a finalização do build, os serviços estarão disponíveis nas seguintes portas:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3025

## 🔌 Endpoints da API

Abaixo estão as rotas disponíveis na API e suas respectivas funções:

- **/sales/commissions**: Rota para realizar o cálculo da comissão dos vendedores.

- **/inventory**: Rota para carregar e listar os produtos do estoque.

- **/inventory/move**: Rota responsável por registrar movimentações de estoque.

- **/finance/interest**: Rota para calcular os juros de atraso.
