import { Column } from '@/models/column.model';
import { checkSchema, ValidationChain } from 'express-validator';
import mongoose from 'mongoose';

export const createCardValidator: ValidationChain[] = checkSchema({
    title: {
        in: 'body',
        notEmpty: {
            errorMessage: 'Card title is required',
            bail: true,
        },
    },
    columnId: {
        in: 'body',
        notEmpty: {
            errorMessage: 'Column is required',
            bail: true,
        },
        custom: {
            options: async columnId => {
                if (!mongoose.Types.ObjectId.isValid(columnId)) {
                    return Promise.reject('Invalid column id value!');
                }
                const isExisting = await Column.exists({ _id: columnId });
                if (!isExisting) {
                    return Promise.reject('Invalid column id value!');
                }
                return true;
            },
        },
    },
});
