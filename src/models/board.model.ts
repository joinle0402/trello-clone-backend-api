import { ColumnDocument } from '@/models/column.model';
import { model, Schema, Types } from 'mongoose';

export interface BoardDocument {
    title: string;
    columnOrder: Types.Array<Types.ObjectId>;
    columns: Types.DocumentArray<ColumnDocument>;
    _destroy: boolean;
}

const boardSchema = new Schema<BoardDocument>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        columnOrder: {
            type: [Types.ObjectId],
            default: [],
        },
        columns: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Columns' }],
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

export const Board = model<BoardDocument>('Boards', boardSchema);
