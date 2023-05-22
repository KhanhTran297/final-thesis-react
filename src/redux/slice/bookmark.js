import { createSlice } from "@reduxjs/toolkit";
const bookmarkStore = createSlice({
    name: "bookmark",
    initialState: {
        listBookmark: []
    },
    reducers: {
        setListBookmark: (state,action) => {
            return {
                ...state,
                listBookmark: action.payload,
            }

        }
    }
});
export const {setListBookmark} = bookmarkStore.actions;
export default bookmarkStore.reducer;