"use server";
import { ProdukSchema } from "./zod";
import { signIn, auth } from "@/lib/auth";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export const TambahProduk = async (image: string, prevState: any, formData: FormData) => {
    
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
                image
            },
        });
    } catch (error) {
        console.log(error);
    }

    redirect("/admin/produk");
}