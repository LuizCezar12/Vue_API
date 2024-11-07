<template>
  <div class="api-container">
    <h1>Preço Atual do Bitcoin</h1>
    
    <!-- Spinner de carregamento -->
    <div v-if="loading" class="spinner">Carregando dados...</div>

    <!-- Exibição de erro -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Lista de preços do Bitcoin -->
    <ul v-if="!loading && !error" class="data-list">
      <li v-for="(value, currency) in info" :key="currency" class="data-item">
        <h3>{{ currency }}</h3>
        <p>{{ value.rate }} {{ value.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      info: {},         // Armazena os dados da API do Coindesk
      loading: true,    // Controla o estado de carregamento
      error: null       // Armazena mensagens de erro, se houver
    };
  },
  created() {
    // Requisição à API do Coindesk ao criar o componente
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        this.info = response.data.bpi;
        this.loading = false;
      })
      
  }
};
</script>

<style scoped>
/* Estilo do contêiner */
.api-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Título */
.api-container h1 {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

/* Estilo do carregamento */
.spinner {
  color: #007bff;
  font-weight: bold;
}

/* Exibição de erro */
.error {
  color: #ff4d4d;
  font-weight: bold;
  margin-bottom: 1rem;
}

/* Lista de dados */
.data-list {
  list-style-type: none;
  padding: 0;
}

.data-item {
  background-color: #ffffff;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.data-item h3 {
  color: #333;
  font-size: 1.2rem;
  margin: 0;
}

.data-item p {
  color: #666;
  margin: 0.5rem 0 0;
}
</style>
