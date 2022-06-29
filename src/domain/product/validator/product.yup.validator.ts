import ValidatorInterface from "../../@shared/validator/validator.interface";
import * as yup from "yup"
import Product from "../entity/product";

export default class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      yup
      .object()
      .shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
        price: yup.number().required().positive("Price must be greater or equal than zero.")
      })
      .validateSync(
        {
          id: entity.id,
          name: entity.name,
          price: entity.price
        },
        {
          abortEarly: false // espera todos os error para parar a execução.
        }
      )
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error: any) => {
        entity.notification.addError({
          context: 'product',
          message: error
        })
      })
    }
  }
}