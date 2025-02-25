import { Transaction } from "@/domain/transactions/entities/transaction"

export interface TransactionsRepository {
  create(transaction: Transaction): Promise<void>
  findById(transactionId: string): Promise<Transaction | null>
  save(transaction: Transaction): Promise<void>
  findManyByOwnerId(ownerId: string): Promise<Transaction[]>
}
