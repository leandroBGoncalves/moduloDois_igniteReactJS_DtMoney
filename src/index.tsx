import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';


createServer({

  //abaixo primeira "tabela do banco de dados do mirage"
  models: {
    transaction: Model,
  },

  routes() {
    this.namespace = 'api';
// abaixo pega do Banco de dados e manda de volta
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })
//abaixo rota para que o mirage consiga receber os dados do formulario e enviar para o banco de dados
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
