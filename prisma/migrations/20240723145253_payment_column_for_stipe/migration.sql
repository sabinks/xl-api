-- AlterTable
ALTER TABLE "BookAppointment" ADD COLUMN     "paymentId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'Pending';
