/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deploymentDate` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsibleId` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "School" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "deploymentDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "responsibleId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Programme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Programme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolSurvey" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "programmeId" TEXT NOT NULL,
    "newStudentsReached" INTEGER NOT NULL,
    "existingStudentsReached" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchoolSurvey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolSurvey" ADD CONSTRAINT "SchoolSurvey_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolSurvey" ADD CONSTRAINT "SchoolSurvey_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
