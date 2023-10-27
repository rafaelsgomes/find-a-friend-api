import { Prisma, Organization } from "@prisma/client";

export interface IOrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByNameAndFullAddress(name:string, address: string, zip_code: string): Promise<Organization>
}