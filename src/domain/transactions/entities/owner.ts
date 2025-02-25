import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface OwnerProps {
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt?: Date
}

export class Owner extends Entity<OwnerProps> {
  static create(
    props: Optional<OwnerProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const owner = new Owner({
      ...props,
      createdAt: new Date()
    }, id)

    return owner
  }
}