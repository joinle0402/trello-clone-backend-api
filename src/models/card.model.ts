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

export const Card = model<CardDocument>('Cards', cardSchema);
