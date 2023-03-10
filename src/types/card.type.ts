import { Types } from 'mongoose';

export interface CreateCardBody {
    title: string;
    thumbnail?: string;
    columnId: Types.ObjectId;
}

export interface UpdateCardBody {
    title?: string;
    column?: Types.ObjectId;
}
