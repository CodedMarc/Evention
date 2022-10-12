import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    age: 1
  },
  reducers: {
    login: state => {

      state.age += 1;
    },
    logout: state => {
      state.age -= 1;
    },
    changeAgeBy: (state, action) => {
      state.age += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout, changeAgeBy } = userSlice.actions;

export default userSlice.reducer;