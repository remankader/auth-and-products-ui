import { createSlice } from "@reduxjs/toolkit";

const miscSlice = createSlice({
  name: "misc",
  initialState: {
    topBarMsgData: { msgType: "", msg: "", pathname: "" } as {
      msgType: string;
      msg: string;
      pathname: "";
    },
  },
  reducers: {
    setTopBarMsg(state, action) {
      state.topBarMsgData = action.payload;
    },
  },
});

export const { setTopBarMsg } = miscSlice.actions;

export default miscSlice.reducer;
