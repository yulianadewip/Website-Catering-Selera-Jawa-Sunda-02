import { number, object, string, coerce, array } from "zod";

export const ProdukSchema = object({
    nama: string().min(1, "Name must be at least 1 characters long"),
    deskripsi: string().min(10, "Description must be at least 10 characters long").max(1000, "Description must be at most 1000 characters long"),
    harga: coerce.number().gt(0, "Capacity must be at least 1 character long"),
});

export const ReserveSchema = object({
    jumlah: coerce.number().gt(0, "Jumlah must be at least 1 character long"),
    email: string().email("Email must be a valid email"),
    tanggal: coerce.date().min(new Date(), "Tanggal must be at least 1 character long"),
    phone: string().min(1, "Phone must be at least 1 character long"),
    lokasi_pengiriman: string().min(1, "Lokasi pengiriman must be at least 1 character long"),
    keterangan: string().min(1, "Keterangan must be at least 1 character long"),
});