import { HydratedDocument } from 'mongoose';
import { BoardDocument, Board } from '@/models/board.model';

const findAll = async () => {
    const boards = await Board.find();
    return boards;
};

const create = async (boardInput: any) => {
    try {
        const board: HydratedDocument<BoardDocument> = new Board(boardInput);
        await board.save();

        return board;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteAll = async () => {
    try {
        await Board.deleteMany({});
    } catch (error) {
        throw new Error(error);
    }
};

export const boardService = {
    findAll,
    create,
    deleteAll,
};
