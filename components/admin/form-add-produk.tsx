"use client";

import clsx from "clsx"
import { useRef, useState, useTransition } from "react";
import { useActionState } from "react";
import { type PutBlobResult } from "@vercel/blob";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import { TambahProduk } from "@/lib/action";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5"

export default function FormAddProduk() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState("");
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

    const deleteFile = (file: string) => {
        startTransition(async () => {
            try {
                await fetch(`/api/upload/?fileUrl=${file}`, {
                    method: "DELETE"
                })
                setImage("");
            } catch (error) {
                console.log(error);
            }
        })
    }

    const [state, formAction, isPending] = useActionState(TambahProduk.bind(null, image), null);


    return (
        <div>
            <form action={formAction}>

                <div>
                    <label htmlFor="nama" className="block mb-1 text-lg font-medium text-gray-900">
                        Nama
                    </label>
                    <input type="text" name="nama" id="nama" className="bg-blue-100 border border-blue-300 text-gray-900 rounded-lg w-full p-2.5" />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.errors?.nama}</p>
                    </div>
                </div>


                <div>
                    <label htmlFor="deskripsi" className="block mb-1 text-lg font-medium text-gray-900">
                        Deskripsi
                    </label>
                    <input type="text" name="deskripsi" id="deskripsi" className="bg-blue-100 border border-blue-300 text-gray-900 rounded-lg w-full p-2.5" />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.errors?.deskripsi}</p>
                    </div>
                </div>

                <div>
                    <label htmlFor="harga" className="block mb-1 text-lg font-medium text-gray-900">
                        Harga
                    </label>
                    <input type="text" name="harga" id="harga" className="bg-blue-100 border border-blue-300 text-gray-900 rounded-lg w-full p-2.5" />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.errors?.harga}</p>
                    </div>
                </div>

                <div className="col-span-4 bg-white p-4">
                    <label
                        htmlFor="input-file"
                        className="flex flex-col mb-4 items-center justify-center h-40 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative"
                    > Upload Gambar Menu
                        <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">

                            {pending ? <BarLoader /> : null}

                            {image ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => deleteFile(image)}
                                        className="flex items-center justify-center bg-red-500 size-6 rounded-sm absolute right-1 top-1 text-white hover:bg-red-600"
                                    >
                                        <IoTrashOutline className="size-4" />
                                    </button>

                                    <div className="flex flex-col items-center">
                                        <p className="text-sm font-semibold text-gray-700">
                                            {image}
                                        </p>
                                        <p className="text-xs text-gray-500">Gambar Berhasil Diupload</p>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <IoCloudUploadOutline className="size-8" />
                                    <p className="mb-1 text-sm font-bold">Upload File Gambar</p>

                                    {message ? (
                                        <p className="text-xs text-red-500">{message}</p>
                                    ) : (
                                        <p className="text-xs">Only .PNG .JPG .JPEG .WEBP (Max 4MB)</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            ref={inputFileRef}
                            onChange={handleUpload}
                            id="input-file"
                            className="hidden"
                        />
                    </label>
                </div>

                {state?.message ? (
                    <div className="mb-4 bg-red-200 p-2">
                        <span className="text-sm text-gray-700 mt-2">{state.message}</span>
                    </div>
                ) : null}

                <div className="flex gap-3">
                    <Link
                        href="/admin/produk"
                        className={clsx(
                            "bg-red-600 text-white w-full hover:bg-red-400 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer text-center"
                        )}
                    >
                        Batal
                    </Link>
                    <button type="submit" className={clsx("bg-blue-600 text-white w-full hover:bg-blue-400 py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer", {
                        "opacity-50 cursor-progress": isPending
                    })} disabled={isPending}>
                        {isPending ? "Saving..." : "Save"}
                    </button>
                </div>
            </form >
        </div>
    )
}