import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const imageFile = formData.get("image") as File | string | null;

    let imageUrl = undefined;

    // Check if the user uploaded a new file
    if (imageFile && typeof imageFile === "object" && 'arrayBuffer' in imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, '_')}`;
      
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      // Create the uploads directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      await writeFile(path.join(uploadDir, filename), buffer);
      imageUrl = `/uploads/${filename}`;
    } else if (typeof imageFile === "string") {
      // The user didn't change the image, so it passed back the old string URL
      imageUrl = imageFile;
    }

    const userId = parseInt((session.user as any).id);

    // Explicitly update only the user matching the session ID.
    const updateData: any = { name, bio };
    if (imageUrl !== undefined) {
      updateData.image = imageUrl;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Profile updated successfully", image: imageUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt((session.user as any).id);

    // Calculate total score from all attempts
    const attempts = await prisma.attempt.aggregate({
      where: { userId: userId },
      _sum: { score: true }
    });

    const rawScore = attempts._sum.score || 0;
    const totalXP = rawScore * 100; // Using XP_MULTIPLIER

    return NextResponse.json({ totalXP });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile stats" },
      { status: 500 }
    );
  }
}
