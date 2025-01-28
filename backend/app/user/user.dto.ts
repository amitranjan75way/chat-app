
import mongoose from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
        name: string;
        email: string;
        password: string;
        profilePic: string;
        refreshToken: string;
        groups: mongoose.Types.ObjectId;
}

export interface Payload {
        _id: string;
        name: string;
        email: string;
}