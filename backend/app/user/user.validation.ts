
import { body } from 'express-validator';

export const registerUser = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('email').notEmpty().withMessage('email is required').isString().withMessage('email must be a string'),
    body('password').notEmpty().withMessage('password is required').isString().withMessage('password must be a string'),
];

export const loginUser = [
    body('email').notEmpty().withMessage('email is required').isString().withMessage('email must be a string'),
    body('password').notEmpty().withMessage('password is required').isString().withMessage('password must be a string')
];

export const updatePassword = [
    body('oldPassword').notEmpty().withMessage('oldPassword is required').isString().withMessage('oldPassword must be a string'),
    body('newPassword').notEmpty().withMessage('newPassword is required').isString().withMessage('newPassword must be a string')
]



