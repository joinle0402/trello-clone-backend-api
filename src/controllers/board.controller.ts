import { Request, Response } from 'express';
import { boardService } from '@/services/board.service';

const findAll = async (request: Request, response: Response) => {
    const boards = await boardService.findAll();

    response.status(200).json({
        message: 'Get all boards successfully',
        boards,
    });
};

const findOne = async (request: Request, response: Response) => {
    const board = await boardService.findOne(request.params.boardId);

    response.status(200).json({
        message: 'Get all board successfully',
        board,
    });
};

const create = async (request: Request, response: Response) => {
    try {
        const createdBoard = await boardService.create(request.body);

        response.status(201).json({
            message: 'Board created successfully',
            createdBoard,
        });
    } catch (error) {
        response.status(500).json({
            error: error.message,
        });
    }
};

const updateById = async (request: Request, response: Response) => {
    try {
        const updatedBoard = await boardService.updateBoardById(request.params.boardId, request.body);

        response.status(201).json({
            message: 'Board updated successfully',
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
        await boardService.deleteAll();

        response.status(200).json({
            message: 'Delete all board successfully!',
        });
    } catch (error) {
        response.status(400).json({
            error: error.message,
        });
    }
};

export const boardController = {
    findAll,
    findOne,
    create,
    updateById,
    deleteAll,
};
