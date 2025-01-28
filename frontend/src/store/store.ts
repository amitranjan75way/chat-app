import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import groupList from "./reducers/groupList";
import messageReducer from "./reducers/messageReducer";
import { authApi } from "../services/authApi";
import { userApi } from "../services/userApi"; 
import { chatApi } from '../services/chatApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    groupList: groupList,
    messageReducer: messageReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer, 
    [chatApi.reducerPath]: chatApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, chatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
