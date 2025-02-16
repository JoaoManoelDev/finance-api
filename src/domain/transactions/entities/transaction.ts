import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entityid"

interface TransactionProps {
  userId: string
  amount: string
  type: 'income' | 'outcome'
  createdAt: Date
  description?: string
  paymentMethod: string
  recurring: boolean
}

export class Transaction extends Entity<TransactionProps> {
  static create(
    props: TransactionProps,
    id?: UniqueEntityID
  ) {
    const transaction = new Transaction({
      ...props
    }, id)

    return transaction
  }
}