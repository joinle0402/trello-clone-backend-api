import { Board } from '@/models/board.model';
import { checkSchema, ValidationChain } from 'express-validator';

export const createBoardValidator: ValidationChain[] = checkSchema({
    title: {
        in: 'body',
        notEmpty: {
            errorMessage: 'Title is required',
        },
        custom: {
            options: value => {
                return Board.find({
                    title: value,
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Title already in use');
                    }
                });
            },
        },
    },
});
