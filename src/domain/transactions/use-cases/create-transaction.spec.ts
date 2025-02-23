import { InMemoryTransactionsRepository } from "@/tests/repositories/in-memory-transactions-repository"
import { CreateTransactionUseCase } from "./create-transaction"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryTransactionsRepository: InMemoryTransactionsRepository
let sut: CreateTransactionUseCase

describe('Create Transaction Use Case', () => {
  beforeEach(() => {
    inMemoryTransactionsRepository = new InMemoryTransactionsRepository()
    sut = new CreateTransactionUseCase(inMemoryTransactionsRepository)
  })

  it('should be able create a new transaction', async () => {
    const result = await sut.execute({
      ownerId: 'owner-01',
      amountInCents: '6990',
      paymentMethod: 'pix',
      recurring: false,
      type: 'income',
      title: 'Pizza'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryTransactionsRepository.transactions).toHaveLength(1)
    expect(inMemoryTransactionsRepository.transactions[0].id).toBe(result.value?.transaction.id)
    expect(inMemoryTransactionsRepository.transactions[0].ownerId).toEqual(new UniqueEntityID('owner-01'))
    expect(inMemoryTransactionsRepository.transactions[0].amountInCents).toBe('6990')
    expect(inMemoryTransactionsRepository.transactions[0].paymentMethod).toBe('pix')
    expect(inMemoryTransactionsRepository.transactions[0].recurring).toBe(false)
    expect(inMemoryTransactionsRepository.transactions[0].type).toBe('income')
    expect(inMemoryTransactionsRepository.transactions[0].title).toBe('Pizza')
  })
})
