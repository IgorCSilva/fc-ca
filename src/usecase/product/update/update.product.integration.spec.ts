import { Sequelize } from "sequelize-typescript"
import Product from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository"
import FindProductUseCase from "../find/find.product.usecase"
import UpdateProductUseCase from "./update.product.usecase"

describe('Test update product use case', () => {

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

  it('should update product', async () => {
    
    const productRepository = new ProductRepository()
    const usecase = new UpdateProductUseCase(productRepository)
    const findusecase = new FindProductUseCase(productRepository)

    const product = new Product('123', 'Produto', 10)
    
    const product_created = await productRepository.create(product)
    
    await usecase.execute({id: product.id, name: 'Novo Nome', price: 50})
    const result = await findusecase.execute({id: product_created.id})
    
    expect(result.id).toBe(product_created.id)
    expect(result.name).toBe('Novo Nome')
    expect(result.price).toBe(50)
  })
})