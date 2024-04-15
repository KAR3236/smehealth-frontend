import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./Slice/loaderSlice";
import healthInfoSlice from "./Slice/healthInfo";

export default configureStore({
  reducer: {
    loader: loaderSlice,
    healthInfo: healthInfoSlice,
  },
});
