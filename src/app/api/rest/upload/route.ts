import {NextRequest, NextResponse} from "next/server";
import path from "path";
import {writeFile} from "fs/promises";

export async function POST(req: NextRequest) {
    const data = await req.formData();
    const file: File | null = data.get("file") as File;
    if (!file) {
        return NextResponse.json({success: false});
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadPath = path.join(process.cwd(), "public/uploads", file.name);
    await writeFile(uploadPath, buffer);
    console.log(`open ${uploadPath} to see the uploaded file`);
    return NextResponse.json({success: true});
}
