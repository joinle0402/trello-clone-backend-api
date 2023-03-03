import { Request, Response } from 'express';
import { columnService } from '@/services/column.service';
import { boardService } from '@/services/board.service';

const findAll = async (request: Request, response: Response) => {
    const columns = await columnService.findAll();

    response.status(200).json({
        message: 'Get all columns successfully',
        columns,
    });
};

const create = async (request: Request, response: Response) => {
    try {
        const createdColumn = await columnService.create(request.body);
        const updatedBoard = await boardService.updateColumnInBoard(request.body.board, createdColumn._id);

        response.status(201).json({
            message: 'Column created successfully',
            createdColumn,
            updatedBoard,
        });
    } catch (error) {
        response.status(500).json({
            error: error.message,
        });
    }
};

const deleteAll = async (request: Request, response: Response) => {
    try {
        await columnService.deleteAll();

        response.status(200).json({
            message: 'Delete all columns successfully!',
        });
    } catch (error) {
        response.status(400).json({
            error: error.message,
        });
    }
};

export const columnController = {
    findAll,
    create,
    deleteAll,
};
