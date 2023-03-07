import { Column, ColumnDocument } from '@/models/column.model';
import { NextFunction } from 'express';
import { Document, model, Schema, Types } from 'mongoose';

export interface BoardDocument extends Document {
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

boardSchema.pre('deleteMany', async function (next: NextFunction) {
    try {
        const deletedBoards = await Board.find(this['_conditions']);
        deletedBoards.forEach(async deletedBoard => {
            await Column.deleteMany({ _id: { $in: [...deletedBoard['columns']] } });
        });

        return next();
    } catch (error) {
        return next(error);
    }
});

export const Board = model<BoardDocument>('Boards', boardSchema);
