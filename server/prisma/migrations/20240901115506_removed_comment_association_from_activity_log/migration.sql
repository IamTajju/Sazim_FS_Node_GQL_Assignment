/*
  Warnings:

  - You are about to drop the column `commentId` on the `ActivityLog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActivityLog" DROP CONSTRAINT "ActivityLog_commentId_fkey";

-- DropIndex
DROP INDEX "ActivityLog_commentId_key";

-- AlterTable
ALTER TABLE "ActivityLog" DROP COLUMN "commentId";
