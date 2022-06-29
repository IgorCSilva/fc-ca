export interface InputCreateCustomerDTO {
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}

// ? Mesmo tendo apenas o id cono diferença não devemos reutilizar a interface de input para criar a de output, porque elas mudam por razões diferentes.
export interface OutputCreateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}