import { CreateColumnBody } from '@/types/column.type';
import { HydratedDocument } from 'mongoose';
import { ColumnDocument, Column } from '@/models/column.model';

const findAll = async () => {
    const columns = await Column.find();
    return columns;
};

const create = async (columnInput: CreateColumnBody) => {
    try {
        const column: HydratedDocument<ColumnDocument> = new Column(columnInput);
        await column.save();

        return column;
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
