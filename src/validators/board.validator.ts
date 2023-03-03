import { Board } from '@/models/board.model';
import { checkSchema, ValidationChain } from 'express-validator';

export const createBoardValidator: ValidationChain[] = checkSchema({
    title: {
        in: 'body',
        notEmpty: {
            errorMessage: 'Board title is required',
            bail: true,
        },
        custom: {
            options: value => {
                return Board.find({
                    title: value,
                }).then(board => {
                    if (board.length > 0) {
                        return Promise.reject('Board title already in use');
                    }
                });
            },
        },
    },
});
