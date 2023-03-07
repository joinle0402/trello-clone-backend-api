import { Types } from 'mongoose';

export interface CreateColumnBody {
    title: string;
    boardId: Types.ObjectId;
}

export interface UpdateColumnBody {
    _id?: Types.ObjectId;
    title?: string;
    cardOrder?: Types.Array<Types.ObjectId>;
}
