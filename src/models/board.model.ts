import { model, Schema } from 'mongoose';

export interface BoardDocument {
    title: string;
    columnOrder: string[];
    _destroy: boolean;
}

const boardSchema = new Schema<BoardDocument>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        columnOrder: {
            type: [String],
            default: [],
        },
        _destroy: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Board = model<BoardDocument>('Board', boardSchema);
