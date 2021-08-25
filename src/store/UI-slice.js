import { createSlice } from '@reduxjs/toolkit';

const initialUIState = { notification: null };

const UISlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    hideNotification(state) {
      state.notification = null;
    },
  },
});

export default UISlice.reducer;
export const UIActions = UISlice.actions;
