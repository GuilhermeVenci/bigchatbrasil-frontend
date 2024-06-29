'use client';
import { useUser } from '@/context/user-context';
import apiRequest from '@/utils/api';
import { useEffect, useState } from 'react';
import TextInput from '../ui/text-input';
import Button from '../ui/button';
import PhoneInput from './inputs/phone-input';
import SelectInput from '../ui/select-input';

interface ClientFormProps {
  onClientCreated: (client: any) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ onClientCreated }) => {
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    phone: '',
    cpf: '',
    cnpj: '',
    companyName: '',
    plan: 'PREPAID',
  });

  useEffect(() => {
    if (user)
      setFormData((prevData) => ({
        ...prevData,
        userId: user.id,
      }));
  }, [user]);

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.userId) {
      try {
        const response = await apiRequest('/clients/native', 'POST', formData);
        onClientCreated(response);
      } catch (error) {
        setError('Failed to create client');
      }
    } else {
      setError('userId not found');
    }
  };

  return (
    <div className="flex flex-col gap-y-4 mx-auto p-4 max-w-md">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold">Cadastro de usuário</h1>
        <p className="text-base text-neutral-600">
          Finalize seu cadastro para utilizar a ferramenta
        </p>
      </div>
      <form onSubmit={handleSubmit} className="container">
        <TextInput
          label="Nome"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mb-[18px]"
          maxLength={150}
        />
        <PhoneInput
          label="Telefone"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <TextInput
          label="CPF"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
          className="mb-[18px]"
          maxLength={11}
        />
        <TextInput
          label="Nome da empresa"
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="mb-[18px]"
          maxLength={200}
        />
        <TextInput
          label="CNPJ"
          id="cnpj"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleChange}
          required
          className="mb-[18px]"
          maxLength={14}
        />
        <SelectInput
          label="Plano"
          id="plan"
          name="plan"
          value={formData.plan}
          onChange={(value) => handleSelectChange('plan', value)}
          options={[
            { value: 'PREPAID', label: 'Pré-pago' },
            { value: 'POSTPAID', label: 'Pós-pago' },
          ]}
        />

        {error && <div className="rounded text-red-300 mb-[18px]">{error}</div>}
        <Button type="submit" className="mt-6">
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default ClientForm;
