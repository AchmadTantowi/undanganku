import { configureStore } from '@reduxjs/toolkit';
import invitationReducer from './invitationSlice';

// Redux store configuration. Add your reducers here.
export const store = configureStore({
  reducer: {
    invitation: invitationReducer,
  },
});

export default store;
