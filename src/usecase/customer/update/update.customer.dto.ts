export interface InputUpdateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}

// ? Apesar de terem a mesma estrutura eles podem mudar por razões diferentes, logo devem ser interfaces disttintas.
export interface OutputUpdateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}