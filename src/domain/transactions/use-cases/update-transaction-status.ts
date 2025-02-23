import { Either, left, right } from "@/core/erros/either"
import { Transaction, TransactionStatus } from "@/domain/transactions/entities/transaction"
import { TransactionsRepository } from "@/domain/transactions/repositories/transactions-repository"

const VALID_STATUS: Record<TransactionStatus, true> = {
  canceled: true,
  completed: true,
  failed: true,
  pending: true,
  refunded: true,
}

interface UpdateTransactionStatusRequest {
  transactionId: string
  status: TransactionStatus
}

type UpdateTransactionStatusResponse = Either<
  string,
  {
    transaction: Transaction
  }
> 

export class UpdateTransactionStatus {
  constructor(private transactionsRepository: TransactionsRepository){}

  async execute({
    status,
    transactionId
  }: UpdateTransactionStatusRequest): Promise<UpdateTransactionStatusResponse>  {
    if (!(status in VALID_STATUS)) {
      return left(`invalid status: ${status}.`)
    }

    const transaction = await this.transactionsRepository.findById(transactionId)

    if (!transaction) {
      return left('transaction not found.')
    }

    if (transaction.status === 'completed' && status === 'pending') {
      return left('unable to revert a completed transaction to pending.')
    }

    transaction.status = status

    await this.transactionsRepository.save(transaction)

    return right({
      transaction
    })
  }
}
