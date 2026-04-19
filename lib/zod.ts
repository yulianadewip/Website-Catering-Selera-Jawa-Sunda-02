import { number, object, string, coerce, array } from "zod";

export const ProdukSchema = object({
    nama: string().min(1, "Name must be at least 1 characters long"),
    deskripsi: string().min(10, "Description must be at least 10 characters long").max(1000, "Description must be at most 1000 characters long"),
    harga: coerce.number().gt(0, "Capacity must be at least 1 character long"),
});