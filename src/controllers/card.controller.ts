import { Request, Response } from 'express';
import { cardService } from '@/services/card.service';

const findAll = async (request: Request, response: Response) => {
    const cards = await cardService.findAll();

    response.status(200).json({
        message: 'Get all cards successfully',
        cards,
    });
};

const create = async (request: Request, response: Response) => {
    try {
        const { createdCard, updatedColumn } = await cardService.create(request.body);

        response.status(201).json({
            message: 'Card created successfully',
            createdCard,
            updatedColumn,
        });
    } catch (error) {
        response.status(500).json({
            error: error.message,
        });
    }
};

const deleteAll = async (request: Request, response: Response) => {
    try {
        await cardService.deleteAll();

        response.status(200).json({
            message: 'Delete all cards successfully!',
        });
    } catch (error) {
        response.status(400).json({
            error: error.message,
        });
    }
};

export const cardController = {
    findAll,
    create,
    deleteAll,
};
