import { Sequelize } from "sequelize-typescript"
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository"
import ListProductUseCase from "./list.product.usecase"

describe('Test list product use case', () => {

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

  it('should list products', async () => {
    
    const productRepository = new ProductRepository()
    const usecase = new ListProductUseCase(productRepository)

    const product1 = new Product('123', 'Produto', 10)
    const product2 = new Product('122', 'Produto 2', 20)
    
    await productRepository.create(product1)
    await productRepository.create(product2)
    
    const product_list = await usecase.execute({})

    expect(product_list.products.length).toBe(2)
    expect(product_list.products[0].id).toBe(product1.id)
    expect(product_list.products[0].name).toBe(product1.name)
    expect(product_list.products[0].price).toBe(product1.price)
    expect(product_list.products[1].id).toBe(product2.id)
    expect(product_list.products[1].name).toBe(product2.name)
    expect(product_list.products[1].price).toBe(product2.price)
  })
})