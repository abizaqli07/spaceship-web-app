-- DropForeignKey
ALTER TABLE "ticket_has_status" DROP CONSTRAINT "ticket_has_status_ticketId_fkey";

-- AddForeignKey
ALTER TABLE "ticket_has_status" ADD CONSTRAINT "ticket_has_status_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id_ticket") ON DELETE CASCADE ON UPDATE CASCADE;
