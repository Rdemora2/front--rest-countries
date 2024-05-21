<template>
  <div class="register">
    <UForm
      class="w-5/6 lg:w-1/4"
      :state="formData"
      @submit.prevent="handleSubmit"
    >
      <div class="formDiv" v-if="step === 1">
        <div>
          <label for="name">Nome Completo</label>
          <UInput id="name" v-model="formData.name" required />
        </div>
        <div>
          <label class="mt-3" for="dob">Data de Nascimento</label>
          <UInput type="date" id="dob" v-model="formData.dob" required />
        </div>
        <CPFInput
          @updateCpf="updateCpfFromChild"
          @cpfInvalid="cpfInvalid = $event"
        />
        <div>
          <label class="mt-3" for="pet">Espécie do Pet</label>
          <USelect
            id="pet"
            v-model="formData.petType"
            :options="['Cão', 'Gato']"
            @change="updateBreeds"
            class="custom-select"
            required
          />
        </div>
        <div>
          <label class="mt-3" for="breed">Raça do Pet</label>
          <USelect
            id="breed"
            v-model="formData.petBreed"
            :options="petBreeds"
            class="custom-select"
            required
          />
        </div>
        <div v-if="formData.petBreed === 'outro'">
          <label class="mt-3" for="otherBreed">Outro</label>
          <UInput
            type="text"
            id="otherBreed"
            v-model="formData.otherBreed"
            required
          />
        </div>
        <MoneyInput
          @updateIncome="updateIncomeFromChild"
          @showMinValueWarning="showMinValueWarning = $event"
        />
        <UButton class="mb-5 mt-5" @click="nextStep">Próximo</UButton>
      </div>
      <div v-else-if="step === 2">
        <div>
          <label for="street">Rua</label>
          <UInput
            type="text"
            id="street"
            v-model="formData.street"
            required
            disabled
          />
        </div>
        <div>
          <label class="mt-3" for="neighborhood">Bairro</label>
          <UInput
            type="text"
            id="neighborhood"
            v-model="formData.neighborhood"
            required
            disabled
          />
        </div>
        <div>
          <label class="mt-3" for="city">Cidade</label>
          <UInput
            type="text"
            id="city"
            v-model="formData.city"
            required
            disabled
          />
        </div>
        <div>
          <label class="mt-3" for="state">Estado</label>
          <UInput
            type="text"
            id="state"
            v-model="formData.state"
            maxlength="2"
            required
            disabled
          />
        </div>
        <UButtonGroup size="xl" orientation="horizontal">
          <UButton class="mt-5 mr-5" @click="prevStep">Voltar</UButton>
          <UButton class="mt-5" type="submit">Enviar</UButton>
        </UButtonGroup>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import MoneyInput from "../components/moneyInput.vue";
import CPFInput from "../components/CPFInput.vue";

const step = ref(1);
const cpfInvalid = ref(false);
const showMinValueWarning = ref(false);

const formData = ref({
  name: "",
  dob: "",
  cpf: "",
  petType: "",
  petBreed: "",
  otherBreed: "",
  income: 0,
  cep: "",
  street: "",
  neighborhood: "",
  city: "",
  state: "",
});

const updateCpfFromChild = (formattedCpf: string) => {
  formData.value.cpf = formattedCpf;
};

const updateIncomeFromChild = (formatNumber: number) => {
  formData.value.income = formatNumber;
};

const petBreeds = ref<string[]>([]);

const nextStep = () => {
  console.log("Validando campos:");
  console.log("Nome:", formData.value.name);
  console.log("Data de Nascimento:", formData.value.dob);
  console.log("CPF:", formData.value.cpf);
  console.log("Espécie do Pet:", formData.value.petType);
  console.log("Raça do Pet:", formData.value.petBreed);
  console.log("Outra Raça:", formData.value.otherBreed);
  console.log("Renda:", formData.value.income);
  console.log("cpfInvalid:", cpfInvalid.value);
  console.log("showMinValueWarning:", showMinValueWarning.value);

  if (
    !cpfInvalid.value &&
    !showMinValueWarning.value &&
    formData.value.name &&
    formData.value.dob &&
    formData.value.cpf &&
    formData.value.petType &&
    formData.value.petBreed &&
    (formData.value.petBreed !== "outro" || formData.value.otherBreed) &&
    formData.value.income > 0
  ) {
    step.value++;
  } else {
    console.error(
      "Todos os campos obrigatórios devem ser preenchidos e o CPF deve ser válido."
    );
  }
};

const prevStep = () => {
  step.value--;
};

const updateBreeds = () => {
  if (formData.value.petType === "Cão") {
    petBreeds.value = [
      "Spitz Alemão",
      "Bulldog",
      "Shih Tzu",
      "Rottweiler",
      "Pug",
      "Outro",
    ];
  } else {
    petBreeds.value = [
      "Persa",
      "Siamês",
      "Maine Coon",
      "Sphynx",
      "Ragdoll",
      "Outro",
    ];
  }
};

const fetchAddress = async () => {
  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${formData.value.cep}/json/`
    );
    formData.value.street = response.data.logradouro;
    formData.value.neighborhood = response.data.bairro;
    formData.value.city = response.data.localidade;
    formData.value.state = response.data.uf;
  } catch (error) {
    console.error("Erro ao buscar o endereço:", error);
  }
};

const handleSubmit = () => {
  console.log("Formulário enviado:", formData.value);
};
</script>

<style scoped>
.register {
  width: 100vw;
  max-width: 100%;
  min-height: calc(100vh - 9.73rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

UForm,
formDiv {
  max-width: 600px;
  width: 85vw !important;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(15 22 33);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: white;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: white;
}

UInput,
select,
button {
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

.custom-select .u-select__control {
  background-color: white;
  color: black;
}

.custom-select .u-select__menu {
  background-color: white;
  color: black;
}

.custom-select .u-select__option {
  background-color: white;
  color: black;
}
</style>
