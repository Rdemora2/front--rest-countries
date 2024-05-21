import { ref } from "vue";
import axios from "axios";
import { parseISO, differenceInYears } from "date-fns";

export const formData = ref({
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
export const petBreeds = ref<string[]>([]);
export const step = ref(1);
export const validAge = () => validateAge(formData.value.dob);
export const cpfInvalid = ref(false);
export const showMinValueWarning = ref(false);

export function updateCpfFromChild(formattedCpf: string): void {
  formData.value.cpf = formattedCpf;
}

export function updateIncomeFromChild(formatNumber: number): void {
  formData.value.income = formatNumber;
}

export function updateBreeds(): void {
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
}

export async function fetchAddress(): Promise<void> {
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
}

export function nextStep(): void {
  if (
    !cpfInvalid.value &&
    !showMinValueWarning.value &&
    formData.value.name &&
    formData.value.dob &&
    formData.value.cpf &&
    formData.value.petType &&
    formData.value.petBreed &&
    (formData.value.petBreed !== "outro" || formData.value.otherBreed) &&
    formData.value.income > 0 &&
    validAge()
  ) {
    step.value++;
  } else {
    console.error(
      "Todos os campos obrigatórios devem ser preenchidos e o CPF deve ser válido."
    );
  }
}

export function prevStep(): void {
  step.value--;
}

export function handleSubmit(): void {
  console.log("Formulário enviado:", formData.value);
}

export function validateAge(dateOfBirth: string): boolean {
  const birthday = parseISO(dateOfBirth);
  const age = differenceInYears(new Date(), birthday);
  const valid = age >= 18 && age <= 65;
  return valid;
}
