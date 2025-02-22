import { randomUUID } from "node:crypto"

export class UniqueEntityID {
  private value: string

  toValue() {
    return this, this.value
  }

  toString() {
    return this.value.toString()
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }
}