import { Sequelize } from "sequelize-typescript"
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository"
import CreateProductUseCase from "./create.product.usecase"

describe('Test create product use case', () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true}
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input = {
      type: 'a',
      name: 'Product',
      price: 100
    }
    
    const product_created = await usecase.execute(input)

    expect(product_created.name).toEqual(input.name)
    expect(product_created.price).toEqual(input.price)
  })
})