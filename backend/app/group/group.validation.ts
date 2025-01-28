import { body, param } from "express-validator";

export const createGroup = [
  body('name').notEmpty().withMessage('group name is required').isString().withMessage('name must be a string'),
]

export const sendInviteLink = [
  body('eamil').notEmpty().withMessage('eamil id is required').isString().withMessage('email must be a string'),
  param('groupId').notEmpty().withMessage('groud id is required').isString().withMessage('group id must be a string'),
]

export const acceptInvite = [
  param('inviteId').notEmpty().withMessage('inviteId id is required').isString().withMessage('inviteId id must be a string'),
]

export const sendMessage = [
  param('groupId').notEmpty().withMessage('Group ID is required').isString().withMessage('Group ID must be a string'),
  body('content').notEmpty().withMessage('Message content is required').isString().withMessage('Message must be a string'),
];

export const getMessages = [
  param('groupId').notEmpty().withMessage('Group ID is required').isString().withMessage('Group ID must be a string'),
]