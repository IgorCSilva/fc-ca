import Address from "../value-object/address"
import CustomerFactory from "./customer.factory"

describe('Customer factory unit tests', () => {
  
  it('should create a customer', () => {
    let customer = CustomerFactory.create('Igor')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('Igor')
    expect(customer.address).toBeUndefined()
  })

  it('should create a new customer with a new address', () => {
    const address = new Address('Street', 123, '12345-123', 'Camaragibe')
    let customer = CustomerFactory.createWithAddress('Igor', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('Igor')
    expect(customer.address).toBe(address)
  })
})