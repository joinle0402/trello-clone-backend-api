import { Request, Response } from 'express';
import { columnService } from '@/services/column.service';

const findAll = async (request: Request, response: Response) => {
    const columns = await columnService.findAll();

    response.status(200).json({
        message: 'Get all columns successfully',
        columns,
    });
};

const create = async (request: Request, response: Response) => {
    try {
        const { createdColumn, updatedBoard } = await columnService.create(request.body);

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

const updateById = async (request: Request, response: Response) => {
    try {
        const updatedColumn = await columnService.updateById(request.params.columnId, request.body);
        response.status(200).json({
            message: 'Update column successfully!',
            updatedColumn,
        });
    } catch (error) {
        throw new Error(error);
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

const deleteById = async (request: Request, response: Response) => {
    try {
        await columnService.deleteById(request.params.columnId);

        response.status(200).json({
            message: 'Delete column successfully!',
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
    updateById,
    deleteAll,
    deleteById,
};
