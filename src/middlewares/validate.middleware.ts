import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult, ValidationError } from 'express-validator';

const customValidationResult = validationResult.withDefaults({
    formatter: ({ msg: message, param }: ValidationError) => {
        return {
            [param]: message,
        };
    },
});

export const validate = (validations: ValidationChain[]) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(request)));

        const errors = customValidationResult(request);
        if (errors.isEmpty()) {
            return next();
        }

        response.status(400).json({ errors: errors.array() });
    };
};
