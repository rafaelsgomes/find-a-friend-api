import { IOrganizationsRepository } from "@/repositories/IOrganizationsRepository";
import { Organization } from "@prisma/client";
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from "./errors/organizationAlreadyExistsError";

interface CreateOrganizationRequest {
  person_responsible: string
  email: string
  zip_code: string
  address: string
  phone: string
  password: string
}

interface CreateOrganizationResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}
  async execute({address, email, password, person_responsible, phone, zip_code}: CreateOrganizationRequest): Promise<CreateOrganizationResponse>{
    const organizationAlreadyExists = await this.organizationsRepository.findByNameAndFullAddress(person_responsible, address, zip_code)

    if(organizationAlreadyExists) {
      throw new OrganizationAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      address,
      email,
      password_hash,
      person_responsible,
      phone,
      zip_code
    })

    return {
      organization
    }
  }
}

