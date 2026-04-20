import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const getProdukById = async (id: string) => {
    try {
        const result = await prisma.produk.findUnique({
            where: {
                id
            },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getProduk = async () => {
    try {
        const result = await prisma.produk.findMany();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getAllPesanan = async () => {
    try {
        const result = await prisma.pesanan.findMany({
            include: {
                produk: true,
                user: true
            },

            orderBy: {
                createdAt: "desc"
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getPesananByUserId = async () => {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized Access");
    }
    try {
        const result = await prisma.pesanan.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                produk: {
                    select: {
                        nama: true,
                        image: true,
                        harga: true,
                        deskripsi: true,
                    }
                },
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
            },

            orderBy: {
                createdAt: "desc"
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}