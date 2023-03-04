import { SchemaDefinitionProperty, Types } from 'mongoose';

export interface CreateColumnBody {
    title: string;
    boardId: Types.ObjectId;
}
