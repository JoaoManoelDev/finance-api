import { Owner } from "@/domain/transactions/entities/owner"
import { OwnerRepository } from "@/domain/transactions/repositories/owner.repository"

export class InMemoryOwnerRepository implements OwnerRepository {
  public owners: Owner[] = []

  async create(owner: Owner): Promise<void> {
    this.owners.push(owner)
  }
}
