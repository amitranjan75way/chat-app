import mongoose from "mongoose";
import { IGroup } from "./group.dto";

const GroupSchema = new mongoose.Schema<IGroup>(
  {
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String 
    },
    profilePic: {
      type: String,
      default: ''
    },
    admin: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    members: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    inviteLink: { 
      type: String, 
      unique: true 
    },
    joinRequests: [
      {
        user: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User' 
        },
        status: { 
          type: String, 
          enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' 
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IGroup>('Group', GroupSchema);
