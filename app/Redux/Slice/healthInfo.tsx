import { createSlice } from "@reduxjs/toolkit";

export const healthInfoSlice = createSlice({
  name: "blog",
  initialState: {
    datas: [],
    loader: false,
  },
  reducers: {
    listOfHealthInfo: (state, action) => {
      return { ...state, datas: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { listOfHealthInfo } = healthInfoSlice.actions;

export default healthInfoSlice.reducer;
