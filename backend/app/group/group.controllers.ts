import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { Types } from "mongoose";
import createHttpError from "http-errors";
import * as GroupService from "./group.service";
import { sendEmail } from "../common/services/email.service";
import { inviteLinkEmailTemplate } from "../common/template/inviteLink.tamplate";
import { IUser } from "../user/user.dto";

/**
 * Handles the creation of a new group by an authenticated user.
 * 
 * @param {Request} req - The request object containing user data and the group details in the body.
 * @param {Response} res - The response object used to send the status and the created group data.
 * 
 * @throws {createHttpError} Throws an error if the user is not authorized or if the group name is missing.
 * 
 * @returns {Object} A JSON response with a success message and the created group.
 */
export const createGroup = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw createHttpError(401, "User not authorized, please login again.");
  }

  const adminId = user._id;
  
  const { name, description } = req.body;
  

  if (!name) {
    throw createHttpError(400, "Group name is required.");
  }
  
  const newGroup = await GroupService.createGroup({ name, description }, adminId);
  
  res.status(201).json({
    message: "Group created successfully.",
    group: newGroup,
  });
});

/**
 * Fetches all the groups available in the system.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to send the status and the groups data.
 * 
 * @returns {Object} A JSON response containing the success message and the list of all groups.
 */
export const getAllgroup = asyncHandler(async(req: Request, res: Response) => {
  const groups = await GroupService.getAllgroup();
  res.status(200).json({
    message: "all group fetched successfully.",
    groups
  });
});


/**
 * Generates an invite link for a specified group and sends it to a provided email address.
 * 
 * @param {Request} req - The request object containing the group ID and the email address.
 * @param {Response} res - The response object used to send the status of the invite link sending.
 * 
 * @throws {createHttpError} Throws an error if the group ID or email is invalid.
 * 
 * @returns {Object} A JSON response with a success message.
 */

export const sendInviteLink = asyncHandler(async(req: Request, res: Response)=>{
  const { groupId } = req.params;
  const { email } = req.body;

  // Call the service to generate the invite link
  const inviteLink = await GroupService.generateInviteLinkForUser(groupId, email);

  // Send the invite email
  const eamilContent = inviteLinkEmailTemplate(inviteLink);
  await sendEmail({
    to: email,
    subject: "You're invited to join a group!",
    html: eamilContent,
  });

  res.status(200).json({
    message: "Invite link sent successfully.",
  });

});


/**
 * Handles the process of a user accepting an invite to join a group.
 * 
 * @param {Request} req - The request object containing the invite ID and user data.
 * @param {Response} res - The response object used to send the status and updated group data.
 * 
 * @throws {createHttpError} Throws an error if the user is not found or if the invite ID is invalid.
 * 
 * @returns {Object} A JSON response with a success message and the updated group details.
 */

export const acceptInviteLink = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw createHttpError(401, "User not found, please login again.");
  }

  const { inviteId } = req.params;

  // Call the service to handle the invite acceptance logic
  const updatedGroup = await GroupService.acceptInviteLink(inviteId, (user as any)._id);

  res.status(200).json({
    message: "You have successfully joined the group.",
    group: updatedGroup,
  });
});


/**
 * Sends a message to a specified group.
 * 
 * @param {Request} req - The request object containing the group ID, message content, and user data.
 * @param {Response} res - The response object used to send the status and the sent message.
 * 
 * @throws {createHttpError} Throws an error if the user is not found or if the message content is empty.
 * 
 * @returns {Object} A JSON response with a success message and the sent message data.
 */

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw createHttpError(401, "User not found, please login again.");
  }

  const { content } = req.body;
  const { groupId } = req.params;

  if (!content) {
    throw createHttpError(400, "Message content is required.");
  }

  const message = await GroupService.sendMessageToGroup(groupId, (user as any)._id, content);

  res.status(200).json({
    message: "Message sent successfully.",
    sentMessage: message,
  });
});


/**
 * Retrieves all messages for a specified group.
 * 
 * @param {Request} req - The request object containing the group ID and user data.
 * @param {Response} res - The response object used to send the status and the fetched messages.
 * 
 * @throws {createHttpError} Throws an error if the user is not found.
 * 
 * @returns {Object} A JSON response with a success message and the list of messages.
 */

export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw createHttpError(401, "User not found, please login again.");
  }

  const { groupId } = req.params;

  const messages = await GroupService.getMessagesForGroup(groupId, (user as any)._id);

  res.status(200).json({
    success: true,
    message: "Messages fetched successfully.",
    messages,
  });
});
