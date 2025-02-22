import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Transaction } from "@/domain/transactions/entities/transaction"
import { transactionsRepository } from "@/domain/transactions/repositories/transactions-repository"

interface CreateTransactionUseCaseRequest {
  ownerId: string
  title: string
  amountInCents: string
  type: 'income' | 'outcome'
  description?: string
  paymentMethod: string
  recurring: boolean
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction
}

export class CreateTransactionUseCase {
  constructor(private transactionsRepository: transactionsRepository) {}

  async execute({
    ownerId,
    title,
    amountInCents,
    paymentMethod,
    recurring,
    type,
    description,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = Transaction.create({
      title,
      amountInCents,
      paymentMethod,
      recurring,
      type,
      ownerId: new UniqueEntityID(ownerId),
      description
    })

    this.transactionsRepository.create(transaction)

    return { transaction }
  }
}
