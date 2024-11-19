import mongoose, { Schema, Document } from 'mongoose';

interface IJigsawPuzzle extends Document {
    title: string;
    pieceCount: number;
    dimensions: { width: number; height: number };
    theme: string;
    manufacturer: string;
    difficultyLevel: 'Easy' | 'Medium' | 'Hard';
    price: number;
    inStock: boolean;
}

const JigsawPuzzleSchema = new Schema({
    title: { type: String, required: true, trim: true },
    pieceCount: { type: Number, required: true },
    dimensions: {
        width: { type: Number, required: true },
        height: { type: Number, required: true },
    },
    theme: { type: String, required: true },
    manufacturer: { type: String, required: true },
    difficultyLevel: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    price: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
});

// Use the existing model if it exists, otherwise create it
const JigsawPuzzle = mongoose.models.JigsawPuzzle || mongoose.model<IJigsawPuzzle>('JigsawPuzzle', JigsawPuzzleSchema);

export default JigsawPuzzle;
