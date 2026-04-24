import ProdukTable from "@/components/admin/produk-table"
import Link from "next/link"

export default function Adminprodukpage(){
    return(
        <div className="max-w-7xl px-4 py-20 mt-10 mx-auto">
            <Link href={"/admin/produk/create"} className="text-white bg-[#193F7A] hover:bg-blue-600 py-3 px-5 rounded-sm">Tambah Produk</Link>
            <ProdukTable />
        </div>
    )
}