import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export type TransactionStatus = "completed" | "canceled" | "failed" | "refunded"
export type TransactionType = "income" | "outcome"

export interface TransactionProps {
  ownerId: UniqueEntityID
  title: string
  amountInCents: string
  type: TransactionType
  status: TransactionStatus
  description?: string
  paymentMethod: string
  recurring: boolean
  createdAt: Date
}

export class Transaction extends Entity<TransactionProps> {
  get ownerId() {
    return this.props.ownerId
  }

  get type() {
    return this.props.type
  }

  get amountInCents() {
    return this.props.amountInCents
  }

  get paymentMethod() {
    return this.props.paymentMethod
  }

  get recurring() {
    return this.props.recurring
  }

  get title() {
    return this.props.title
  }

  get status() {
    return this.props.status
  }

  static create(
    props: Optional<TransactionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {

    const transaction = new Transaction({
      ...props,
      createdAt: new Date()
    }, id)

    return transaction
  }
}
