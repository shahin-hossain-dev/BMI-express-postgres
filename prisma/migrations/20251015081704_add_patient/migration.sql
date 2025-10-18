/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- DropIndex
DROP INDEX "public"."users_email_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email";

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(12) NOT NULL,
    "user_id" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "bmi" DOUBLE PRECISION NOT NULL,
    "gender" "Gender" NOT NULL,
    "region" TEXT,
    "date_of_birth" TEXT,
    "origin" TEXT,
    "cur_health_status" TEXT NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "recommendation_id" TEXT,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_user_id_key" ON "Patient"("user_id");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
