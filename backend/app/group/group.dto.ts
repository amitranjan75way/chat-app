import mongoose from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";

export interface IGroup extends BaseSchema {
  name: string;
  description?: string;
  profilePic: string;
  admin: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  inviteLink: string;
  joinRequests: { user: mongoose.Types.ObjectId; status: 'PENDING' | 'ACCEPTED' | 'REJECTED' }[];
}

export interface IMessage extends BaseSchema {
  group: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content: string; 
}