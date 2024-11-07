<template>
  <div class="login-container">
    <h2>Login de Usuário</h2>
    <input v-model="email" placeholder="Digite seu e-mail" class="input-field" />
    <input v-model="password" type="password" placeholder="Digite sua senha" class="input-field" />
    <button @click="login" class="login-button">Entrar</button>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',        // E-mail para login
      password: '',     // Senha para login
      errorMessage: ''  // Armazena mensagem de erro
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          'http://192.168.131.132:3003/users/login', // Insira o IP e porta da sua API
          { email: this.email, password: this.password }
        );

        const token = response.data.token;
        localStorage.setItem('jwtToken', token); // Salva o token
        this.errorMessage = '';
        this.$router.push('/dashboard'); // Redireciona para a página protegida
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Erro ao fazer login';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  font-size: 16px;
}

.login-button {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #369c72;
}

.error {
  color: red;
  margin-top: 15px;
  font-size: 14px;
}
</style>
