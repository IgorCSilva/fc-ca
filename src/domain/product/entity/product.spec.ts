import Product from "./product"

describe('Product unit tests', () => {
  
  it('should throw an error when id is empty', () => {
    expect(() => {
      let product = new Product('', 'Product 1', 100)
    }).toThrowError('product: Id is required')
  })
  
  it('should throw an error when name is empty', () => {
    expect(() => {
      let product = new Product('123', '', 100)
    }).toThrowError('product: Name is required')
  })
  
  it('should throw an error when name and id are empty', () => {
    expect(() => {
      let product = new Product('', '', 100)
    }).toThrowError('product: Id is required,product: Name is required')
  })
  
  it('should throw an error when price is less than zero', () => {
    expect(() => {
      let product = new Product('123', 'Product 1', -1)
    }).toThrowError('product: Price must be greater or equal than zero')
  })

  it('should throw an error when name and id are empty and price is less than zero', () => {
    expect(() => {
      let product = new Product('', '', -3)
    }).toThrowError('product: Id is required,product: Name is required,product: Price must be greater or equal than zero.')
  })
  
  it('should change name', () => {
    let product = new Product('123', 'Product 1', 1)
    product.changeName('Prod 1')

    expect(product.name).toEqual('Prod 1')
  })
  
})