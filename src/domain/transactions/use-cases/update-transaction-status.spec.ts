import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { TransactionStatus } from "@/domain/transactions/entities/transaction"
import { UpdateTransactionStatusUseCase } from "@/domain/transactions/use-cases/update-transaction-status"
import { InMemoryTransactionsRepository } from "@/tests/repositories/in-memory-transactions-repository"
import { makeTransaction } from "@/tests/factories/make-transaction"

let inMemorytransactionsRepository: InMemoryTransactionsRepository
let sut: UpdateTransactionStatusUseCase

describe('Update Transaction Status Use Case', () => {
  beforeEach(() => {
    inMemorytransactionsRepository = new InMemoryTransactionsRepository()
    sut = new UpdateTransactionStatusUseCase(inMemorytransactionsRepository)
  })

  afterEach(() => {
    inMemorytransactionsRepository.transactions = []
  })

  it('should be able to update the status of a transaction', async () => {
    const transaction = makeTransaction({
      status: 'pending'
    }, new UniqueEntityID('transaction-01') )

    await inMemorytransactionsRepository.create(transaction)

    const result = await
      sut.execute({
        status: 'completed',
        transactionId: 'transaction-01',
        ownerId: transaction.ownerId.toString()
      })

    expect(result.isRight()).toBe(true)
    expect(inMemorytransactionsRepository.transactions[0].id).toBe(transaction.id)
    expect(inMemorytransactionsRepository.transactions[0].status).toBe('completed')
    expect(inMemorytransactionsRepository.transactions[0]).toEqual(transaction)
  })

  it('should not be able change the status from completed to pending', async () => {
    const transaction = makeTransaction({ status: 'completed' })

    await inMemorytransactionsRepository.create(transaction)

    const result = await
      sut.execute({
        status: 'pending',
        transactionId: transaction.id.toString(),
        ownerId: transaction.ownerId.toString()
      })

    expect(result.isLeft()).toBe(true)
  })

  it("should not be able update the status with a status value that doesn't exist", async () => {
    const transaction = makeTransaction()

    await inMemorytransactionsRepository.create(transaction)

    const result = await
      sut.execute({
        status: 'incorrectStatus' as TransactionStatus,
        transactionId: transaction.id.toString(),
        ownerId: transaction.ownerId.toString()
      })

    expect(result.isLeft()).toBe(true)
  })

  it('should not be able edit the status from another owner', async () => {
    const transaction = makeTransaction({ status: 'pending' })

    await inMemorytransactionsRepository.create(transaction)

    const result = await
      sut.execute({
        status: 'completed',
        transactionId: transaction.id.toString(),
        ownerId: 'invalid-owner-id'
      })

    expect(result.isLeft()).toBe(true)
  })
})