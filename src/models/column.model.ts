import { model, Schema, Types, SchemaDefinitionProperty } from 'mongoose';

export interface ColumnDocument {
    _id: Types.ObjectId;
    board: SchemaDefinitionProperty<Types.ObjectId>;
    title: string;
    cardOrder: Types.Array<Types.ObjectId>;
    _destroy: boolean;
}

const columnSchema = new Schema<ColumnDocument>(
    {
        board: {
            type: Types.ObjectId,
            ref: 'Boards',
            required: true,
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
        _destroy: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Column = model<ColumnDocument>('Columns', columnSchema);
