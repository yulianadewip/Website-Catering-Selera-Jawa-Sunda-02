import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
    const form = await request.formData();
    const file = form.get("file") as File;

    if (!file || file.size === 0) {
        return NextResponse.json(
            { message: "File is Required" },
            { status: 400 }
        );
    }

    // maksimal 5MB
    if (file.size > 5000000) {
        return NextResponse.json(
            { message: "File must be less than 5 MB" },
            { status: 400 }
        );
    }

    // type yang diizinkan
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
            { message: "File must be an image (jpg, png, webp)" },
            { status: 400 }
        );
    }

    // validasi ekstensi
    const allowedExt = [".jpg", ".jpeg", ".png", ".webp"];
    const isValidExt = allowedExt.some(ext =>
        file.name.toLowerCase().endsWith(ext)
    );

    if (!isValidExt) {
        return NextResponse.json(
            { message: "File extension must be jpg, jpeg, png, or webp" },
            { status: 400 }
        );
    }

    // upload ke vercel blob
    const blob = await put(file.name, file, {
        access: "public",
        multipart: true,
    });

    return NextResponse.json(blob);
};

export const DELETE = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get("url") as string;

    await del(fileUrl);

    return NextResponse.json({ message: "File deleted successfully" });
};