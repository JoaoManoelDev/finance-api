import { Transaction } from "@/domain/transactions/entities/transaction"
import { transactionsRepository } from "@/domain/transactions/repositories/transactions-repository"

export class InMemoryTransactionsRepository implements transactionsRepository {
  public transactions: Transaction[] = []

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction)
  }
}