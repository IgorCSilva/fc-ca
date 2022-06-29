import Product from '../../../../domain/product/entity/product'
import ProductInterface from '../../../../domain/product/entity/product.interface'
import ProductRepositoryInterface from '../../../../domain/product/repository/product-repository.interface'
import ProductModel from './product.model'

export default class ProductRepository implements ProductRepositoryInterface {
  
  async create(entity: Product): Promise<Product> {
    
    const productModel = await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })

    return new Product(
      productModel.id,
      productModel.name,
      productModel.price
    ) 
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price
      },
      {
        where: {
          id: entity.id
        } 
      }
    )
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({where: { id }})

    return new Product(
      productModel.id,
      productModel.name,
      productModel.price
    )
  }

  async findAll(): Promise<Product[]> {
    const productModel = await ProductModel.findAll()

    return productModel.map(productModel => 
      new Product(productModel.id, productModel.name, productModel.price)
    )
  }
}