import { createSlice } from "@reduxjs/toolkit";
const commentStore = createSlice({
    name: "comment",
    initialState: {
        listComment: []
    },
    reducers: {
        setListComment: (state,action) => {
            return {
                ...state,
                listComment: action.payload,
            }

        }
    }
});
export const {setListComment} = commentStore.actions;
export default commentStore.reducer;