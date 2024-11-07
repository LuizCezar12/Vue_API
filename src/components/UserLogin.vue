<template>
  <div>
    <h2>Login de Usuário</h2>
    <input v-model="email" placeholder="Digite seu e-mail" />
    <input v-model="password" type="password" placeholder="Digite sua senha" />
    <button @click="login">Entrar</button>

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
        // Salva o token no localStorage
        localStorage.setItem('jwtToken', token);
        this.errorMessage = '';

        // Navega para outra tela (exemplo de rota chamada "dashboard")
        this.$router.push('/dashboard');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Erro ao fazer login';
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
