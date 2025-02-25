import { Owner } from "@/domain/transactions/entities/owner"

export interface OwnerRepository {
  create(owner: Owner): Promise<void>
}