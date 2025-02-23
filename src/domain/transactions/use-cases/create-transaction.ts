import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Either, right } from "@/core/erros/either"
import { Transaction, TransactionStatus, TransactionType } from "@/domain/transactions/entities/transaction"
import { transactionsRepository } from "@/domain/transactions/repositories/transactions-repository"

interface CreateTransactionUseCaseRequest {
  ownerId: string
  title: string
  amountInCents: string
  type: TransactionType
  status: TransactionStatus
  description?: string
  paymentMethod: string
  recurring: boolean
}

type CreateTransactionUseCaseResponse = Either<
  null,
  {
    transaction: Transaction
  }
> 

export class CreateTransactionUseCase {
  constructor(private transactionsRepository: transactionsRepository) {}

  async execute({
    ownerId,
    title,
    amountInCents,
    paymentMethod,
    recurring,
    type,
    status,
    description,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = Transaction.create({
      title,
      amountInCents,
      paymentMethod,
      recurring,
      type,
      status,
      ownerId: new UniqueEntityID(ownerId),
      description
    })

    this.transactionsRepository.create(transaction)

    return right({
      transaction
    })
  }
}
