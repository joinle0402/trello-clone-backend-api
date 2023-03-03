import { SchemaDefinitionProperty, Types } from 'mongoose';

export interface CreateColumnBody {
    title: string;
    Board: SchemaDefinitionProperty<Types.ObjectId>;
}
