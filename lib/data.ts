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

export const getTotalPesanan = async () => {
    try {
        const result = await prisma.pesanan.count();
        return result;
    } catch (error) {
        console.log(error);
    }
}
         
export const getTotalPendapatan = async () => {
    try {
        const pesanan = await prisma.pesanan.findMany({
            include: {
                produk: {
                    select: {
                        harga: true
                    }
                }
            }
        });

        const total = pesanan.reduce((acc, item) => {
            return acc + (item.jumlah * item.produk.harga);
        }, 0);

        return total;
    } catch (error) {
        console.log(error);
        return 0;
    }
};

export const getPesananById = async (id: string) => {
    try {
        const result = await prisma.pesanan.findUnique({
            where: {
                id
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
                user: true
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const totalPesananDibatalkan = async () => {
    try {
        const result = await prisma.pesanan.count({
            where: {
                status: "Dibatalkan"
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const totalPesananSelesai = async () => {
    try {
        const result = await prisma.pesanan.count({
            where: {
                status: "Selesai"
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}
