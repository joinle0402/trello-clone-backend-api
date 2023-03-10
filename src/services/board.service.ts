import { HydratedDocument, Types } from 'mongoose';
import { BoardDocument, Board } from '@/models/board.model';
import { CreateBoardBody, UpdateBoardBody } from '@/types/board.type';

const findAll = async () => {
    return await Board.find()
        .populate({
            path: 'columns',
            model: 'Columns',
            populate: {
                path: 'cards',
                model: 'Cards',
            },
        })
        .exec();
};

const findOne = async id => {
    return await Board.findOne({ _id: id })
        .populate({
            path: 'columns',
            model: 'Columns',
            populate: {
                path: 'cards',
                model: 'Cards',
            },
        })
        .exec();
};

const create = async (createBoardBody: CreateBoardBody) => {
    try {
        const createdBoard: HydratedDocument<BoardDocument> = new Board(createBoardBody);
        await createdBoard.save();

        return createdBoard;
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

const updateColumnInBoard = async (boardId: Types.ObjectId, columnId: Types.ObjectId) => {
    try {
        const updatedBoard = await Board.findByIdAndUpdate(
            boardId,
            { $push: { columnOrder: columnId, columns: columnId } },
            { new: true }
        );
        return updatedBoard;
    } catch (error) {
        throw new Error(error);
    }
};

const updateBoardById = async (boardId: string, updateBoardBody: UpdateBoardBody) => {
    try {
        return await Board.findByIdAndUpdate(boardId, { $set: updateBoardBody }, { new: true });
    } catch (error) {
        throw new Error(error);
    }
};

export const boardService = {
    findAll,
    findOne,
    create,
    deleteAll,
    updateColumnInBoard,
    updateBoardById,
};
