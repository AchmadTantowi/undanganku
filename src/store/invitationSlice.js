import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  templateId: '',
  wording: {
    // fields will be populated based on categories
    brideName: '',
    groomName: '',
    celebrantName: '',
    age: '',
    graduateName: '',
    degree: '',
    school: '',
    date: '',
    time: '',
    location: '',
    message: 'Kami mengundang Anda untuk menghadiri acara kami.',
  },
  musicId: '',
};

const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    nextStep: (state) => {
      if (state.step < 2) state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 0) state.step -= 1;
    },
    setTemplate: (state, action) => {
      state.templateId = action.payload;
      // Reset some wording fields if needed, but keeping common ones is safer
    },
    updateWording: (state, action) => {
      state.wording = { ...state.wording, ...action.payload };
    },
    setMusic: (state, action) => {
      state.musicId = action.payload;
    },
    resetWizard: () => initialState,
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  setTemplate,
  updateWording,
  setMusic,
  resetWizard,
} = invitationSlice.actions;

export default invitationSlice.reducer;
