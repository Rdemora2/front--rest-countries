<template>
  <div class="register">
    <h1>Cadastro</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Nome Completo</label>
        <input type="text" id="name" v-model="formData.name" required />
      </div>
      <div>
        <label for="dob">Data de Nascimento</label>
        <input type="date" id="dob" v-model="formData.dob" required />
      </div>
      <div>
        <label for="cpf">CPF</label>
        <input type="text" id="cpf" v-model="formData.cpf" required />
      </div>
      <div>
        <label for="pet">Espécie do Pet</label>
        <select id="pet" v-model="formData.petType" @change="updateBreeds">
          <option value="cão">Cão</option>
          <option value="gato">Gato</option>
        </select>
      </div>
      <div>
        <label for="breed">Raça do Pet</label>
        <select id="breed" v-model="formData.petBreed">
          <option v-for="breed in petBreeds" :key="breed" :value="breed">{{ breed }}</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      <div v-if="formData.petBreed === 'outro'">
        <label for="otherBreed">Outro</label>
        <input type="text" id="otherBreed" v-model="formData.otherBreed" required />
      </div>
      <div>
        <label for="income">Renda Mensal</label>
        <input type="number" id="income" v-model="formData.income" min="1000" required />
      </div>
      <div>
        <label for="cep">CEP</label>
        <input type="text" id="cep" v-model="formData.cep" @blur="fetchAddress" required />
      </div>
      <div>
        <label for="street">Rua</label>
        <input type="text" id="street" v-model="formData.street" required />
      </div>
      <div>
        <label for="neighborhood">Bairro</label>
        <input type="text" id="neighborhood" v-model="formData.neighborhood" required />
      </div>
      <div>
        <label for="city">Cidade</label>
        <input type="text" id="city" v-model="formData.city" required />
      </div>
      <div>
        <label for="state">Estado</label>
        <input type="text" id="state" v-model="formData.state" maxlength="2" required />
      </div>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const formData = ref({
  name: '',
  dob: '',
  cpf: '',
  petType: 'cão',
  petBreed: '',
  otherBreed: '',
  income: 0,
  cep: '',
  street: '',
  neighborhood: '',
  city: '',
  state: ''
});

const petBreeds = ref([]);

const updateBreeds = () => {
  if (formData.value.petType === 'cão') {
    petBreeds.value = ['Raça 1', 'Raça 2', 'Raça 3', 'Raça 4', 'Raça 5', 'Outro'];
  } else {
    petBreeds.value = ['Raça A', 'Raça B', 'Raça C', 'Raça D', 'Raça E', 'Outro'];
  }
};

const fetchAddress = async () => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${formData.value.cep}/json/`);
    formData.value.street = response.data.logradouro;
    formData.value.neighborhood = response.data.bairro;
    formData.value.city = response.data.localidade;
    formData.value.state = response.data.uf;
  } catch (error) {
    console.error('Erro ao buscar o endereço:', error);
  }
};

const handleSubmit = () => {
  // Validação e submissão do formulário
  console.log('Formulário enviado:', formData.value);
};
</script>

<style scoped>
.register {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
form div {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input, select, button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
