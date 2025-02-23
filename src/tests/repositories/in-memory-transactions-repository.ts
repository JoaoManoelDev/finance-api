import { Transaction } from "@/domain/transactions/entities/transaction"
import { TransactionsRepository } from "@/domain/transactions/repositories/transactions-repository"

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public transactions: Transaction[] = []

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction)
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = this.transactions.find(transaction => transaction.id.toString() === id)

    if (!transaction) {
      throw new Error('transaction not found')
    }

    return transaction
  }

  async save(transaction: Transaction): Promise<void> {
    const transactionIndex = this.transactions.findIndex(transaction => transaction.id === transaction.id)

    this.transactions[transactionIndex] = transaction
  }
}
