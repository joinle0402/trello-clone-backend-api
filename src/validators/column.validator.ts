import { Board } from '@/models/board.model';
import { checkSchema, ValidationChain } from 'express-validator';
import mongoose from 'mongoose';

export const createColumnValidator: ValidationChain[] = checkSchema({
    title: {
        in: 'body',
        notEmpty: {
            errorMessage: 'Column title is required',
            bail: true,
        },
        custom: {
            options: async (title, { req }) => {
                if (req.body.boardId) {
                    const board = await Board.findOne({ _id: req.body.boardId }).populate('columns');
                    if (board?.columns.find(column => column.title === title)) {
                        return Promise.reject('Column title already in use');
                    }
                    return true;
                }
                return Promise.reject('Server Error');
            },
        },
    },
    boardId: {
        in: 'body',
        notEmpty: {
            errorMessage: 'Board id is required',
            bail: true,
        },
        custom: {
            options: async boardId => {
                if (!mongoose.Types.ObjectId.isValid(boardId)) {
                    return Promise.reject('Invalid board id value!');
                }
                const isExistingBoard = await Board.exists({ _id: boardId });
                if (!isExistingBoard) {
                    return Promise.reject('Invalid board id value!');
                }
                return true;
            },
        },
    },
});
