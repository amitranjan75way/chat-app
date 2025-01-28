
import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
        name: string;
        email: string;
        password: string;
        profilePic: string;
        refreshToken: string;
}

export interface Payload {
        _id: string;
        name: string;
        email: string;
}