<template>
  <div>
    <h1>Pesquisar Presidente por País</h1>
    <input v-model="country" placeholder="Digite o nome do país" />
    <button @click="fetchPresidente">Buscar Presidente</button>

    <div v-if="presidente">
      <h2>Presidente de {{ country }}:</h2>
      <p>{{ presidente }}</p>
    </div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      country: '', // campo para digitar o país
      presidente: '', // resposta do servidor
      error: null, // erro caso o país não seja encontrado
    };
  },
  methods: {
    async fetchPresidente() {
      try {
        // Faz a requisição para o servidor com o país especificado
        const response = await axios.get(`http://localhost:3001/api/president/${this.country}`);
        
        this.presidente = response.data.presidente;
        this.error = null; // limpa erro caso a busca tenha sucesso
      } catch (err) {
        this.error = 'Presidente não encontrado para esse país.'; // exibe mensagem de erro
        this.presidente = '';
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
