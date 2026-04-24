"use server";
import { ProdukSchema, ReserveSchema } from "./zod";
import { signIn, auth } from "@/lib/auth";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

// action untuk tambah produk
export const tambahProduk = async (image: string, prevState: any, formData: FormData) => {
    if (!image) return { message: "Image is required" };

    const rawData = {
        nama: formData.get("nama"),
        deskripsi: formData.get("deskripsi"),
        harga: formData.get("harga")
    }

    const validatedFields = ProdukSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { nama, deskripsi, harga } = validatedFields.data;

    try {
        await prisma.produk.create({
            data: {
                nama,
                deskripsi,
                harga,
                image,
            },
        });
    } catch (error) {
        console.log(error);
    }

    redirect("/admin/produk");
}

// action untuk delete produk
export const deleteProduk = async (id: string, image: string) => {
    try {
        await del(image);

        await prisma.produk.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/admin/produk");
}

// action untuk update produk
export const updateProduk = async (image: string, id: string, prevState: any, formData: FormData) => {
    if (!image) return { message: "Image is required" };

    const rawData = {
        nama: formData.get("nama"),
        deskripsi: formData.get("deskripsi"),
        harga: formData.get("harga"),
    }

    const validatedFields = ProdukSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { nama, deskripsi, harga } = validatedFields.data;

    try {
        await prisma.$transaction([
            prisma.produk.update({
                where: {
                    id,
                },
                data: {
                    nama,
                    deskripsi,
                    harga,
                    image,
                },
            }),
        ])
    } catch (error) {
        console.log(error);
    }

    revalidatePath("/admin/produk");
    redirect("/admin/produk");
}

// action untuk tambah reservasi
export const tambahReservasi = async (
    prevState: any,
    formData: FormData
) => {
    const session = await auth();
    const produkId = formData.get("produkId") as string;

    if (!session?.user?.id) {
        return { redirectTo: `/signin?redirect_url=/produk/${produkId}` };
    }

    const rawData = {
        email: formData.get("email"),
        jumlah: Number(formData.get("jumlah")),
        tanggal: new Date(formData.get("tanggal") as string),
        phone: formData.get("phone"),
        lokasi_pengiriman: formData.get("lokasi_pengiriman"),
        keterangan: formData.get("keterangan"),
    };

    const validatedFields = ReserveSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const reservation = await prisma.pesanan.create({
            data: {
                produkId,
                userId: session.user.id,
                ...validatedFields.data,
            },
        });

        return { success: true, id: reservation.id };
    } catch (error) {
        console.error(error);
        return { error: "Gagal membuat pesanan" };
    }
};

export const validasiStatusPesanan = async (
    id: string,
    prevState: any,
    formData: FormData
) => {

    const status = formData.get("status") as string;

    if (!status) {
        return {
            errors: { status: ["Status wajib dipilih"] }
        };
    }

    try {
        await prisma.pesanan.update({
            where: { id },
            data: { status }
        });

    } catch (error) {
        console.log(error);
        return { message: "Terjadi kesalahan saat menyimpan validasi" };
    }

    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
};