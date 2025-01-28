import mongoose from "mongoose";
import { IMessage } from "./group.dto";

const MessageSchema = new mongoose.Schema<IMessage>(
  {
    group: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Group',
      required: true
    },
    sender: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user', 
      required: true
    },
    content: {
      type: String, 
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>('Message', MessageSchema);
