import { Types } from 'mongoose';

export interface CreateBoardBody {
    title: string;
}

export interface UpdateBoardBody {
    title?: string;
    columnOrder?: Types.Array<Types.ObjectId>;
}
