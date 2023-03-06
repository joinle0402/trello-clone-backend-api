import { Types } from 'mongoose';

export interface CreateColumnBody {
    title: string;
    boardId: Types.ObjectId;
}

export interface UpdateColumnBody {
    title?: string;
    cardOrder?: Types.Array<Types.ObjectId>;
}
