import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Transaction } from "@/domain/transactions/entities/transaction"

export const makeTransaction = (
  override: Partial<Transaction> = {},
  id?: UniqueEntityID
) => {
  const transaction = Transaction.create({
    ownerId: new UniqueEntityID(),
    amountInCents: '1000',
    paymentMethod: 'pix',
    recurring: false,
    status: 'completed',
    title: 'Pizza',
    type: 'outcome',
    ...override
  }, id)

  return transaction
}