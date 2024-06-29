export type ClientType = {
  id: number;
  userId: number;
  plan: string;
  limit?: number;
  credits?: number;
  currentConsumption?: number;
  current_consumption?: number;
  phone: string;
  name: string;
  cpf: string;
  cnpj: string;
  companyName: string;
};
