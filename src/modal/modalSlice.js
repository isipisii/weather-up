import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    modalDetails: {},
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
           state.isOpen = true;
        },
        closeModal: (state) => {
           state.isOpen = false;
        },
        getDetails: (state, action) => {
            state.modalDetails = action.payload;
        }
        
    }
})

export const {openModal, closeModal, getDetails} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;