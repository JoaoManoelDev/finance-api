import { Transaction } from "@/domain/transactions/entities/transaction"

export interface transactionsRepository {
  create(transaction: Transaction): Promise<void>
}