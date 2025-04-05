-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otpExpire" TIMESTAMP(3),
ADD COLUMN     "resetOtp" TEXT;
