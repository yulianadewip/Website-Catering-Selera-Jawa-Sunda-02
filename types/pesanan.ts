import { Prisma } from "@/app/generated/prisma/client"

export type DisableDateProps = Prisma.PesananGetPayload<{
    select: {
        tanggal: true,
    }
}>