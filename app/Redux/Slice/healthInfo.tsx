import { createSlice } from "@reduxjs/toolkit";

export const healthInfoSlice = createSlice({
  name: "healthInfo",
  initialState: {
    datas: [],
    loader: false,
  },
  reducers: {
    listOfHealthInfo: (state, action) => {
      return { ...state, datas: action.payload };
    },
    listOfHealthInfoPdf: (state, action) => {
      return { ...state, datas: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { listOfHealthInfo, listOfHealthInfoPdf } = healthInfoSlice.actions;

export default healthInfoSlice.reducer;
