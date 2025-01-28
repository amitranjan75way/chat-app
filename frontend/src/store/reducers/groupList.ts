import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Group {
  _id: string;
  name: string;
  description: string;
  profilePic?: string;
  admin: string;
  members: string[];
  inviteLink: string;
  joinRequests: { user: string; status: "PENDING" | "ACCEPTED" | "REJECTED" }[];
  createdAt: string;
  updatedAt: string;
}

interface GroupListState {
  groups: Group[];
}

const initialState: GroupListState = {
  groups: [],
};

const groupListSlice = createSlice({
  name: "groupList",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
  },
});

export const { setGroups } = groupListSlice.actions;

export default groupListSlice.reducer;
