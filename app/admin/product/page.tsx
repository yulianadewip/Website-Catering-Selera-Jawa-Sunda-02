import Link from "next/link"

export default function Adminprodukpage(){
    return(
        <div>
            <Link href={"/admin/produk/create"}>Tambah Produk</Link>
        </div>
    )
}