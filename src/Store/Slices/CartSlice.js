import { TrainRounded } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    list:[]
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    removeAll: (state) => {
      state.list = [];
    },
    removeItem: (state, action) => {
      state.list = state.list?.filter((e) => {
        if (e.id == action.payload) {
          e.quantity--;
          if (e.quantity === 0) {
            return false;
          }
          return e;
        }
        return TrainRounded;
      });
    },
    removeProduct:(state, action) =>{
      state.list = state.list?.filter((e) => {
        if (e.id == action.payload) {
          return false
        }
        return e
      })
    },
    addItems: (state, action) => {
      let add = false;
      state.list = state.list.map((e) => {
        if (e.id == action.payload.id) {
          add = true;
          e.quantity++;
          return e;
        }
        return e;
      });
      if (!add) {
        state.list.push({ quantity: 1, ...action.payload });
      }
    },
  },
});
export const { removeAll, removeItem, addItems, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;