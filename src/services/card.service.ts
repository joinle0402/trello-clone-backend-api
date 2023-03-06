import { CreateCardBody, UpdateCardBody } from '@/types/card.type';
import { HydratedDocument } from 'mongoose';
import { CardDocument, Card } from '@/models/card.model';
import { Column } from '@/models/column.model';

const findAll = async () => {
    const cards = await Card.find();
    return cards;
};

const create = async (cardInput: CreateCardBody) => {
    try {
        const { title, columnId } = cardInput;
        const createdCard: HydratedDocument<CardDocument> = new Card({ title, column: columnId });
        await createdCard.save();

        const updatedColumn = await Column.findByIdAndUpdate(
            columnId,
            { $push: { cardOrder: createdCard._id, cards: createdCard._id } },
            { new: true }
        );

        return {
            createdCard,
            updatedColumn,
        };
    } catch (error) {
        throw new Error(error);
    }
};

const updateById = async (columnId: string, updateCardBody: UpdateCardBody) => {
    try {
        const updatedCard = await Column.findByIdAndUpdate(columnId, { $set: updateCardBody }, { new: true });
        return updatedCard;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteAll = async () => {
    try {
        await Card.deleteMany({});
    } catch (error) {
        throw new Error(error);
    }
};

export const cardService = {
    findAll,
    create,
    updateById,
    deleteAll,
};
