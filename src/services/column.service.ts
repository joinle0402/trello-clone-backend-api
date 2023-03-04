import { CreateColumnBody } from '@/types/column.type';
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

const deleteAll = async () => {
    try {
        await Column.deleteMany({});
    } catch (error) {
        throw new Error(error);
    }
};

export const columnService = {
    findAll,
    create,
    deleteAll,
};
