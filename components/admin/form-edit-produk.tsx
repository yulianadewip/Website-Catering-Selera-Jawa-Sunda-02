"use client";

import { updateProduk } from "@/lib/action";
import { useFormState } from "react-dom";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5"
import { useRef, useState, useTransition } from "react";
import { useActionState } from "react";
import { type PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import clsx from "clsx";
import { BarLoader } from "react-spinners";
import { Produk } from "@/app/generated/prisma/client";
import Link from "next/link";

export default function ProdukEditForm({ id, produk }: { id: string, produk: Produk }) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState(produk.image);
    const [message, setMessage] = useState("");
    const [pending, startTransition] = useTransition();

    const handleUpload = () => {
        if (!inputFileRef.current?.files) return null;
        const file = inputFileRef.current.files[0];
        const formData = new FormData();
        formData.set("file", file);

        startTransition(async () => {
            try {
                const response = await fetch("/api/upload", {
                    method: "PUT",
                    body: formData
                })
                const data = await response.json();
                if (response.status !== 200) {
                    setMessage(data.message);
                }
                const img = data as PutBlobResult;
                setImage(img.url);
            } catch (error) {
                console.log(error);
            }
        })
    }

    const deleteImage = (image: string) => {
        startTransition(async () => {
            try {
                await fetch(`/api/upload/?imageUrl=${image}`, {
                    method: "DELETE"
                })
                setImage("");
            } catch (error) {
                console.log(error);
            }
        })
    }

    const [state, formAction, isPending] = useActionState(updateProduk.bind(null, image, id), null);

    return (
        <div>
            <h1 className="text-black text-2xl font-bold">Produk Edit Form</h1>
            <form action={formAction}>
                <div className="mb-5">
                    <label htmlFor="nama" className="block text-sm font-medium text-gray-900">Nama</label>
                    <input type="text"
                        id="nama"
                        name="nama"
                        defaultValue={produk.nama}
                        placeholder="masukkan nama...." className="bg-gray-50 border border-gray-300 text-gray-900
                                rounded-sm focus:ring-blue-500focus:border-blue-500 block w-full p-2.5"
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.errors?.nama}</p>
                    </div>
                </div>

                <div className="mb-5">
                    <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-900">Deskripsi</label>
                    <input type="text"
                        id="deskripsi"
                        name="deskripsi"
                        defaultValue={produk.deskripsi}
                        placeholder="masukkan deskripsi...." className="bg-gray-50 border border-gray-300 text-gray-900
                                rounded-sm focus:ring-blue-500focus:border-blue-500 block w-full p-2.5"
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.errors?.deskripsi}</p>
                    </div>
                </div>

                <div className="mb-5">
                    <label htmlFor="harga" className="block text-sm font-medium text-gray-900">Harga</label>
                    <input type="text"
                        id="harga"
                        name="harga"
                        defaultValue={produk.harga}
                        placeholder="masukkan harga...." className="bg-gray-50 border border-gray-300 text-gray-900
                                rounded-sm focus:ring-blue-500focus:border-blue-500 block w-full p-2.5"
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.errors?.harga}</p>
                    </div>
                </div>

                <div className="col-span-4 bg-white p-4">
                    <label htmlFor="input-file" className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative">
                        <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">


                            {pending ? <BarLoader /> : null}

                            {image ? (
                                <button type="button" onClick={() => deleteImage(image)} className="flex items-center justify-center bg-transparent size-6 rounded-sm absolute right-1 top-1 text-red-400 hover:bg-red-400"><IoTrashOutline className="size-10 hover:text-white" /></button>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <IoCloudUploadOutline className="size-8" />
                                    <p className="mb-1 text-sm font-bold">Select Image</p>

                                    {message ? (
                                        <p className="text-xs text-red-500">{message}</p>
                                    ) : (
                                        <p className="text-xs">SVG, PNG, JPG, GIF, Or Other (Max 4MB)</p>
                                    )}

                                </div>
                            )}
                        </div>

                        {!image ? (
                            <input type="file" ref={inputFileRef} onChange={handleUpload} id="input-file" className="hidden" />
                        ) : (
                            <Image src={image} alt="Preview" width={640} height={360} className="absolute aspect-video rounded-md object-cover" />
                        )}

                    </label>
                </div>

                {state?.message ? (
                    <div className="mb-4 bg-red-200 p-2">
                        <span className="text-sm text-gray-700 mt-2">{state.message}</span>
                    </div>
                ) : null}

                <div className="flex gap-2">
                    <button type="submit" className={clsx("bg-red-600 text-white w-full hover:bg-red-400 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer", {
                        "opacity-50 cursor-progress": isPending
                    })} disabled={isPending}>
                        {isPending ? "Updating..." : "Update"}
                    </button>

                    <Link href="/admin/produk" className="flex justify-center items-center bg-gray-500 text-white w-full hover:bg-gray-400 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}