import groupSchema from "./group.schema";
// import nanoid from "nanoid";
import { v4 as uuidv4 } from "uuid";
import userSchema from "../user/user.schema";
import createHttpError from "http-errors";
import { Types } from "mongoose";
import { loadConfig } from "../common/helper/config.hepler";
import messageSchema from "./message.schema";
loadConfig();

/**
 * Creates a new group and assigns an admin and members to it. 
 * Also generates an invite link and a profile picture for the group.
 * 
 * @param {Object} data - The data to create the group, including group name and optional description.
 * @param {string} adminId - The ID of the user who will be the admin of the group.
 * 
 * @throws {createHttpError} Throws an error if the group creation fails.
 * 
 * @returns {Object} The newly created group.
 */

export const createGroup = async (data: { name: string; description?: string },adminId: string) => {
  
  const inviteLink = uuidv4();
  const profilePic = `https://ui-avatars.com/api/${data.name}?background=random`;
  

  const newGroup = await groupSchema.create({
    ...data,
    admin: adminId,
    members: [adminId],
    inviteLink,
    profilePic
  });

  await userSchema.findByIdAndUpdate(adminId, {
    $push: { groups: newGroup._id },
  });

  return newGroup;
};

/**
 * Fetches all the groups available in the system.
 * 
 * @returns {Array} A list of all groups.
 */

export const getAllgroup = async() => {
  const groups = await groupSchema.find();
  return groups;
};


/**
 * Generates an invite link for a group and sends it to the provided user's email.
 * 
 * @param {string} groupId - The ID of the group for which the invite link is being generated.
 * @param {string} email - The email of the user to send the invite link to.
 * 
 * @throws {createHttpError} Throws an error if the user or group is not found.
 * 
 * @returns {string} The generated invite link for the group.
 */

export const generateInviteLinkForUser = async (groupId: string, email: string) => {
  // Find the user by email
  const user = await userSchema.findOne({ email });

  if (!user) {
    throw createHttpError(404, "User not found with this email.");
  }

  // Find the group associated with the admin
  const group = await groupSchema.findById(groupId);

  if (!group) {
    throw createHttpError(404, "No group found for this Id.");
  }
  const inviteLink = `${process.env.BASE_URL}/join-group/${group.inviteLink}`;
  // Return the invite link from the group
  return inviteLink;
};


/**
 * Allows a user to accept an invite to join a group using the invite link.
 * 
 * @param {string} inviteId - The invite link ID to join the group.
 * @param {Types.ObjectId} userId - The ID of the user accepting the invite.
 * 
 * @throws {Error} Throws an error if the invite link is invalid, the user is already a member, or the group is not found.
 * 
 * @returns {Object} The updated group after adding the user to the members list.
 */

export const acceptInviteLink = async (inviteId: string, userId: Types.ObjectId) => {
  // Find the group with the invite link
  const group = await groupSchema.findOne({ inviteLink: inviteId });
  if (!group) {
    throw new Error("Invalid invite link or group not found.");
  }

  // Check if the user is already a member
  if (group.members.includes(userId)) {
    throw new Error("You are already a member of this group.");
  }

  // Add the user to the group's members list
  group.members.push(userId);

  // Update the group document in the database
  await group.save();

  // Optionally, update the user's group reference (if needed)
  await userSchema.findByIdAndUpdate(userId, {
    $push: { groups: group._id },
  });

  return group;
};

/**
 * Sends a message to a specified group from a user.
 * 
 * @param {string} groupId - The ID of the group where the message will be sent.
 * @param {Types.ObjectId} userId - The ID of the user sending the message.
 * @param {string} content - The content of the message being sent.
 * 
 * @throws {createHttpError} Throws an error if the group is not found, or the user is not a member of the group.
 * 
 * @returns {Object} The newly created message.
 */

export const sendMessageToGroup = async (groupId: string, userId: Types.ObjectId, content: string) => {
  // Find the group by its ID
  const group = await groupSchema.findById(groupId);

  if (!group) {
    throw createHttpError(404, "Group not found.");
  }

  // Check if the user is a member of the group
  if (!group.members.includes(userId)) {
    throw createHttpError(403, "You are not a member of this group.");
  }

  // Create the message in the database
  const newMessage = await messageSchema.create({
    group: groupId,
    sender: userId,
    content,
  });

  return newMessage;
};


/**
 * Retrieves all messages for a specified group.
 * 
 * @param {string} groupId - The ID of the group whose messages are being fetched.
 * @param {Types.ObjectId} userId - The ID of the user fetching the messages.
 * 
 * @throws {createHttpError} Throws an error if the group is not found, or the user is not a member of the group.
 * 
 * @returns {Array} A list of messages in the group, with populated sender details.
 */

export const getMessagesForGroup = async (groupId: string, userId: Types.ObjectId) => {
  // Find the group by its ID
  const group = await groupSchema.findById(groupId);

  if (!group) {
    throw createHttpError(404, "Group not found.");
  }

  // Check if the user is a member of the group
  if (!group.members.includes(userId)) {
    throw createHttpError(403, "You are not a member of this group and cannot view the messages.");
  }

  // Fetch the messages for the group
  const messages = await messageSchema.find({ group: groupId }).populate("sender", "name email profilePic");

  return messages;
};

