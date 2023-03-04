import { NextFunction } from 'express';
import { model, Schema, SchemaDefinitionProperty, Types } from 'mongoose';
import { Column } from './column.model';

export interface CardDocument {
    _id: Types.ObjectId;
    column: SchemaDefinitionProperty<Types.ObjectId>;
    title: string;
    thumbnail?: string;
    _destroy: boolean;
}

const cardSchema = new Schema<CardDocument>(
    {
        column: {
            type: Types.ObjectId,
            required: true,
            ref: 'Columns',
        },
        title: {
            type: String,
            trim: true,
            required: true,
        },
        thumbnail: {
            type: String,
            trim: true,
            default: '',
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

cardSchema.pre('deleteMany', async function (next: NextFunction) {
    try {
        const deletedCards = await Card.find(this['_conditions']);
        for (const deletedCard of deletedCards) {
            await Column.findOneAndUpdate(
                { _id: deletedCard.column },
                { $pull: { cardOrder: deletedCard._id, cards: deletedCard._id } }
            );
        }

        return next();
    } catch (error) {
        return next(error);
    }
});

export const Card = model<CardDocument>('Cards', cardSchema);
