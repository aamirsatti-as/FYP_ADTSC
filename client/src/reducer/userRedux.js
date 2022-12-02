import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    // alertCount:[],
    isFetching: false,
    cameras: null,
  },
  reducers: {
    // Start: (state) => {
    //   state.alertCount =null;
    // },

    CountUnpaired: (state, action) => {
      state.isFetching = false;
      state.cameras = { Email: 'aamir@gmail.cm' };

    }
  },
});

export const { CountUnpaired } = userSlice.actions;
export default userSlice.reducer;
