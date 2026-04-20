import { deleteProduk } from "@/lib/action";
import { IoTrashOutline, IoPencil } from "react-icons/io5"
import Link from "next/link";

export const EditButton = ({id}: {id: string}) => {
    return (
        <Link href={`/admin/produk/edit/${id}`} className="rounded-sm p-1 bg-black text-white hover:bg-gray-200 cursor-pointer">
            <IoPencil className="size-5"/>
        </Link>
    );
}

export const DeleteButton = ({id, image}: {id: string, image: string}) => {
    const DeleteProdukWithId = deleteProduk.bind(null, id, image);
    return (
        <form action={DeleteProdukWithId}>
            <button type="submit" className="rounded-sm p-1 bg-black text-white hover:bg-gray-200 cursor-pointer">
                <IoTrashOutline className="size-5"/>
            </button>
        </form>
    );
}