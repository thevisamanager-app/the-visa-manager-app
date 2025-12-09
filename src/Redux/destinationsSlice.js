import { createSlice } from '@reduxjs/toolkit';
import DESTINATIONS from '../assets/data/destinations';

const initialState = {
  list: DESTINATIONS,      // all countries
  selected: null,          // selected country for checkout
};

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    setDestinations(state, action) {
      state.list = action.payload;
    },
    setSelectedDestination(state, action) {
      state.selected = action.payload; // whole object (country item)
    },
    clearSelectedDestination(state) {
      state.selected = null;
    },
  },
});

export const {
  setDestinations,
  setSelectedDestination,
  clearSelectedDestination,
} = destinationsSlice.actions;

export default destinationsSlice.reducer;
