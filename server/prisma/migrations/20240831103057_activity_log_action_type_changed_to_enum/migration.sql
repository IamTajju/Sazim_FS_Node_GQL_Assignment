/*
  Warnings:

  - Changed the type of `actionType` on the `ActivityLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `postId` on table `ActivityLog` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ActivityAction" AS ENUM ('POST', 'LIKE', 'COMMENT');

-- AlterTable
ALTER TABLE "ActivityLog" DROP COLUMN "actionType",
ADD COLUMN     "actionType" "ActivityAction" NOT NULL,
ALTER COLUMN "postId" SET NOT NULL;
