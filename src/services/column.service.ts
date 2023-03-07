import { CreateColumnBody, UpdateColumnBody } from '@/types/column.type';
import { HydratedDocument } from 'mongoose';
import { ColumnDocument, Column } from '@/models/column.model';
import { Board } from '@/models/board.model';

const findAll = async () => {
    const columns = await Column.find();
    return columns;
};

const create = async (columnInput: CreateColumnBody) => {
    try {
        const { title, boardId } = columnInput;
        const createdColumn: HydratedDocument<ColumnDocument> = new Column({ title, board: boardId });
        await createdColumn.save();

        const updatedBoard = await Board.findByIdAndUpdate(
            boardId,
            { $push: { columnOrder: createdColumn._id, columns: createdColumn._id } },
            { new: true }
        );

        return {
            createdColumn,
            updatedBoard,
        };
    } catch (error) {
        throw new Error(error);
    }
};

const updateById = async (columnId: string, updateColumnBody: UpdateColumnBody) => {
    try {
        const updatedColumn = await Column.findByIdAndUpdate(
            columnId,
            { $set: { ...updateColumnBody } },
            { new: true }
        );
        return updatedColumn;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteAll = async () => {
    try {
        await Column.deleteMany({});
    } catch (error) {
        throw new Error(error);
    }
};

const deleteById = async (columnId: string) => {
    try {
        await Column.deleteMany({ _id: { $in: [columnId] } });
    } catch (error) {
        throw new Error(error);
    }
};

export const columnService = {
    findAll,
    create,
    updateById,
    deleteAll,
    deleteById,
};
