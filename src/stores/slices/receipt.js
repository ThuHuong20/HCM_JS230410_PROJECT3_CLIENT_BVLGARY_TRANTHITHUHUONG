import { createSlice } from "@reduxjs/toolkit";

const receiptSlice = createSlice({
    name: "receipt",
    initialState: {
        loading: true,
        data: null,
    },
    // reducer: tuong tac share du lieu cho nguoi khac
    reducers: {
        changeLoad: (state, action) => {
            return {
                ...state,
                load: !state.load,
            };
        },
        setReceiptData: (state, action) => {
            state.data = [...action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => {
                if (action.meta) {
                    return action;
                }
            },
            (state, action) => {
                if (action.meta) {
                    if (action.meta.requestStatus == "pending") {

                        state.loading = true;
                    }
                    if (action.meta.requestStatus == "rejected") {
                        //console.log("đã vào rejected của api: ", action.type)
                        state.loading = false;
                    }
                    if (action.meta.requestStatus == "fulfilled") {
                        //console.log("đã vào fulfilled của api: ", action.type)
                        state.loading = false;
                    }
                }
            },
        );
    },
});

export const receiptActions = {
    ...receiptSlice.actions
};

export const receiptReducer = receiptSlice.reducer;