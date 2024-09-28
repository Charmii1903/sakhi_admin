import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/lib/models/Collection";
import { auth } from "@clerk/nextjs/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();
    console.log("Database connected successfully");

    const { title, description, image } = await req.json();
    console.log("Received data:", { title, description, image });

    const existingCollection = await Collection.findOne({ title });
    console.log("Existing collection:", existingCollection);

    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    const newCollection = new Collection({
      title,
      description,
      image,
    });

    await newCollection.save();
    console.log("New collection saved:", newCollection);

    return NextResponse.json(newCollection, { status: 200 });
  } catch (err) {
    console.error("[collections_POST] Internal Server Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    console.log("Database connected successfully");

    const collections = await Collection.find().sort({ createdAt: "desc" });
    console.log("Fetched collections:", collections);

    return NextResponse.json(collections, { status: 200 });
  } catch (err) {
    console.error("[collections_GET] Internal Server Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";