<!-- Dashboard.vue -->
<template>
  <div>
    <h2>Bem-vindo ao Dashboard</h2>
    <button @click="confirmarEntrega">Confirmar Entrega</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    async confirmarEntrega() {
      try {
        const response = await fetch('http://192.168.131.132:3003/users/entregador/confirmarEntrega', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao confirmar entrega');
        }

        const data = await response.json();
        console.log('Resposta da API:', data); 
        alert(data.Entrega); // Alerta de sucesso
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        alert('Erro ao confirmar entrega');
      }
    },
    logout() {
      localStorage.removeItem('jwtToken'); // Remove o token
      this.$router.push('/login'); // Redireciona para a página de login
    }
  }
};
</script>
