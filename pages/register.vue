<template>
  <div class="register">
    <h1>Cadastro</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Nome Completo</label>
        <UInput
          id="name"
          v-model="formData.name"
          color="primary"
          variant="outline"
          required
        />
      </div>
      <div>
        <label for="dob">Data de Nascimento</label>
        <UInput
          type="date"
          id="dob"
          v-model="formData.dob"
          color="primary"
          variant="outline"
          required
        />
      </div>
      <div>
        <label for="cpf">CPF</label>
        <UInput
          type="text"
          id="cpf"
          v-model="formData.cpf"
          color="primary"
          variant="outline"
          required
        />
      </div>
      <div>
        <label for="pet">Espécie do Pet</label>
        <USelect
          id="pet"
          v-model="formData.petType"
          :options="['cão', 'gato']"
          @change="updateBreeds"
          color="primary"
          variant="outline"
        />
      </div>
      <div>
        <label for="breed">Raça do Pet</label>
        <USelect
          id="breed"
          v-model="formData.petBreed"
          :options="petBreeds"
          color="primary"
          variant="outline"
        />
      </div>
      <div v-if="formData.petBreed === 'outro'">
        <label for="otherBreed">Outro</label>
        <UInput
          type="text"
          id="otherBreed"
          v-model="formData.otherBreed"
          color="primary"
          variant="outline"
          required
        />
      </div>
      <div>
        <label for="income">Renda Mensal</label>
        <UInput
          type="number"
          id="income"
          v-model="formData.income"
          min="1000"
          color="primary"
          variant="outline"
          required
        />
      </div>
      <div>
        <label for="cep">CEP</label>
        <UInput
          type="text"
          id="cep"
          v-model="formData.cep"
          color="primary"
          variant="outline"
          @blur="fetchAddress"
          required
        />
      </div>
      <div>
        <label for="street">Rua</label>
        <UInput
          type="text"
          id="street"
          v-model="formData.street"
          color="primary"
          variant="outline"
          required
        />
      </div>
      <div>
        <label for="neighborhood">Bairro</label>
        <UInput
          type="text"
          id="neighborhood"
          v-model="formData.neighborhood"
          color="primary"
          variant="outline"
          required
        />
      </div>
      <div>
        <label for="city">Cidade</label>
        <UInput
          type="text"
          id="city"
          v-model="formData.city"
          color="primary"
          variant="outline"
          required
        />
      </div>
      <div>
        <label for="state">Estado</label>
        <UInput
          type="text"
          id="state"
          v-model="formData.state"
          maxlength="2"
          color="primary"
          variant="outline"
          required
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
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

const petBreeds = ref<string[]>([]);

const updateBreeds = () => {
  if (formData.value.petType === 'cão') {
    petBreeds.value = ['Raça 1', 'Raça 2', 'Raça 3', 'Raça 4', 'Raça 5', 'outro'];
  } else {
    petBreeds.value = ['Raça A', 'Raça B', 'Raça C', 'Raça D', 'Raça E', 'outro'];
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
  background-color: rgb(15 22 33);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  color: white;
}
form div {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: white;
}
input, select, button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  background-color: #007bff;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}

USelect {
  color: white  !important;
}
</style>
