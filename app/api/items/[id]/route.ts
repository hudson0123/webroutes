import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JigsawPuzzle from '@/models/jigsawPuzzle';

// GET: Retrieve a specific item by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const item = await JigsawPuzzle.findById(params.id);

        if (!item) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json(item, { status: 200 });
    } catch (error) {
        console.error('Error fetching item:', error);
        return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
    }
}

// PUT: Update a specific item by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const data = await req.json();

        const updatedItem = await JigsawPuzzle.findByIdAndUpdate(params.id, data, {
            new: true, // Return the updated document
            runValidators: true, // Validate data before updating
        });

        if (!updatedItem) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
        console.error('Error updating item:', error);
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}

// DELETE: Delete a specific item by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();

        const deletedItem = await JigsawPuzzle.findByIdAndDelete(params.id);

        if (!deletedItem) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting item:', error);
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}
