import { Sequelize } from "sequelize-typescript"
import Order from "../../../../domain/checkout/entity/order"
import OrderItem from "../../../../domain/checkout/entity/order_item"
import Customer from "../../../../domain/customer/entity/customer"
import Address from "../../../../domain/customer/value-object/address"
import Product from "../../../../domain/product/entity/product"
import CustomerModel from "../../../customer/repository/sequilize/customer.model"
import OrderItemModel from "./order-item.model"
import ProductModel from "../../../product/repository/sequilize/product.model"
import ProductRepository from "../../../product/repository/sequilize/product.repository"
import CustomerRepository from "../../../customer/repository/sequilize/customer.repository"
import OrderModel from "./order.model"
import OrderRepository from "./order.repository"

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true}
    })

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipcode 1', 'city 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123'
        }
      ]
    })
  })

  it('should update order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipcode 1', 'city 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const updatedOrderItem = new OrderItem(
      '2',
      product.name,
      product.price,
      product.id,
      10
    )

    const order = new Order('123', '123', [orderItem])
    const updatedOrder = new Order('123', '123', [updatedOrderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    let orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123'
        }
      ]
    })

    await orderRepository.update(updatedOrder)

    orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: updatedOrder.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123'
        }
      ]
    })
  })

  it('should find order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipcode 1', 'city 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderResult = await orderRepository.find(order.id)

    expect(orderResult).toStrictEqual(order)
  })

  it('should throw an error when order is not found', async () => {
    const orderRepository = new OrderRepository()

    expect(async () => {
      await orderRepository.find('12aoid')
    }).rejects.toThrow('Order not found')
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'zipcode 1', 'city 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )
    const orderItem2 = new OrderItem(
      '2',
      product.name,
      product.price,
      product.id,
      22
    )

    const order1 = new Order('123', '123', [orderItem])
    const order2 = new Order('456', '123', [orderItem2])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order1)
    await orderRepository.create(order2)

    const ordersResult = await orderRepository.findAll()

    expect(ordersResult.length).toBe(2)
    expect(ordersResult).toContainEqual(order1)
    expect(ordersResult).toContainEqual(order2)
  })
})