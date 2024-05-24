import { ref } from "vue";
import axios from "axios";
import { parseISO, differenceInYears } from "date-fns";
import { cpf } from "cpf-cnpj-validator";

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
export const nextStepClicked = ref(false);
export const submitClicked = ref(false);

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
  const cep = formData.value.cep.replace(/[^\d]/g, "");

  if (cep.length !== 8) {
    console.error("CEP inválido. O CEP deve conter 8 dígitos.");
    return;
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    formData.value.street = response.data.logradouro;
    formData.value.neighborhood = response.data.bairro;
    formData.value.city = response.data.localidade;
    formData.value.state = response.data.uf;
  } catch (error) {
    console.error("Erro ao buscar o endereço:", error);
  }
}

export function nextStep(): void {
  nextStepClicked.value = true;
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
  submitClicked.value = true;
  if (
    formData.value.cep &&
    formData.value.street &&
    formData.value.neighborhood &&
    formData.value.state
  ) {
    console.log("Formulário enviado:", formData.value);
    saveToLocalStorage();
    localStorage.setItem("registered", "true");
  }
}

function saveToLocalStorage() {
  const formDataJson = JSON.stringify(formData.value);
  localStorage.setItem("formData", formDataJson);
}

export function getFormDataFromLocalStorage() {
  const formDataJson = localStorage.getItem("formData");
  if (formDataJson) {
    formData.value = JSON.parse(formDataJson);
  }
}

export function validateAge(dateOfBirth: string): boolean {
  const birthday = parseISO(dateOfBirth);
  const age = differenceInYears(new Date(), birthday);
  const valid = age >= 18 && age <= 65;
  return valid;
}

export function validateCPF(inputCPF: string): {
  formatted: string;
  isValid: boolean;
} {
  const unformattedCPF = inputCPF.replace(/[^\d]/g, "");
  const isValidCPF = cpf.isValid(unformattedCPF);
  const formatted = isValidCPF ? cpf.format(unformattedCPF) : inputCPF;
  return { formatted, isValid: isValidCPF };
}

export function formatCurrency(value: string): string {
  const valueNumeric = parseFloat(value.replace(/[^\d]/g, ""));
  const numericFormattedValue = (valueNumeric / 100)
    .toFixed(2)
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
  return `R$ ${numericFormattedValue}`;
}

export function checkMinimumValue(value: string): boolean {
  const valueNumeric = parseFloat(value.replace(/[^\d]/g, ""));
  return valueNumeric < 100000;
}
