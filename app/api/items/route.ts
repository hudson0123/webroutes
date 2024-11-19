import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JigsawPuzzle from '@/models/jigsawPuzzle';

// GET: Fetch all items
export async function GET() {
    await dbConnect();
    const items = await JigsawPuzzle.find();
    return NextResponse.json(items, { status: 200 });
}

// POST: Add a new item
export async function POST(req: Request) {
    await dbConnect();
    const data = await req.json();
    const newItem = new JigsawPuzzle(data);
    const savedItem = await newItem.save();
    return NextResponse.json(savedItem, { status: 201 });
}
