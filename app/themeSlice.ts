import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: state => {
      state.darkMode = true;
    },
    unsetDarkMode: state => {
      state.darkMode = false;
    },
  },
});

export const { toggleDarkMode, setDarkMode, unsetDarkMode } =
  themeSlice.actions;

export default themeSlice.reducer;
