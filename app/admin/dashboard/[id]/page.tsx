
import { notFound } from "next/navigation";
import { getPesananById } from "@/lib/data";
import FormEditStatusPesanan from "@/components/admin/form-edit-status-pesanan";

export default async function DetailValidasiPesananPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const pesanan = await getPesananById(id);
    if (!pesanan) {
        notFound();
    }
    return (
        <>
            <h1>Detail Pesanan</h1>
            <FormEditStatusPesanan id={id} pesanan={pesanan} />
        </>
    );
}