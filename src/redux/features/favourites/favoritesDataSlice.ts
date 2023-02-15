import {createSlice} from '@reduxjs/toolkit';
import { itemsListModel } from '../../../pages/Home.page';

interface State  {
  favoritesItemsList: itemsListModel[],
};

const initialState: State = {
  favoritesItemsList: [],
};

const favoritesDataSlice = createSlice({
  name: 'favoritesData',
  initialState,
  reducers: {
    addFavoriteItem: (state, action) => {
      state.favoritesItemsList.push(action.payload);
    },
    removeFavoriteItem: (state, action) => {
      state.favoritesItemsList = state.favoritesItemsList.filter(
        (item) => item.id !== action.payload.id,
      );
    }
  },
});

export const {addFavoriteItem, removeFavoriteItem} = favoritesDataSlice.actions;
export default favoritesDataSlice.reducer;
