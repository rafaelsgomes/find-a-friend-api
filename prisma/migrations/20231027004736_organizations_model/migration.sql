-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "person_responsible" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);
