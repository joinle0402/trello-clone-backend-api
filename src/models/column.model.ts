import { NextFunction } from 'express';
import { model, Schema, Types, SchemaDefinitionProperty } from 'mongoose';
import { Board } from './board.model';
import { Card } from './card.model';

export interface ColumnDocument {
    _id: Types.ObjectId;
    title: string;
    board: SchemaDefinitionProperty<Types.ObjectId>;
    cardOrder: Types.Array<Types.ObjectId>;
    cards: Types.DocumentArray<ColumnDocument>;
    _destroy: boolean;
}

const columnSchema = new Schema<ColumnDocument>(
    {
        board: {
            type: Types.ObjectId,
            required: true,
            ref: 'Boards',
        },
        title: {
            type: String,
            trim: true,
            required: true,
        },
        cardOrder: {
            type: [Types.ObjectId],
            default: [],
        },
        cards: {
            type: [{ type: Types.ObjectId, ref: 'Cards' }],
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

columnSchema.pre('deleteMany', async function (next: NextFunction) {
    try {
        const deletedColumns = await Column.find(this['_conditions']);
        for (const deletedColumn of deletedColumns) {
            await Board.findOneAndUpdate(
                { _id: deletedColumn.board },
                { $pull: { columnOrder: deletedColumn._id, columns: deletedColumn._id } }
            );
        }

        return next();
    } catch (error) {
        return next(error);
    }
});

export const Column = model<ColumnDocument>('Columns', columnSchema);
