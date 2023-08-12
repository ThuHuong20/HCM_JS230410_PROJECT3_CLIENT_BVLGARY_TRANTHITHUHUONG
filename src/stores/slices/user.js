import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const find = createAsyncThunk("/find", async () => {
  let result = await api.users.find();
  return result.data;
});

const authenToken = createAsyncThunk("/authen-token", async () => {
  let result = await api.users.authenToken(
    {
      token: localStorage.getItem('token')
    }
  );
  return result.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    data: null,
  },
  reducers: {
    changeLoad: (state, action) => {
      return {
        ...state,
        load: !state.load,
      };
    },
    logOut: (state, action) => {
      return {
        ...state, userInfor: null
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(find.fulfilled, (state, action) => {
      state.data = [...action.payload.data];
    });
    builder.addCase(authenToken.fulfilled, (state, action) => {
      state.data = action.payload.data;
      // if (action.payload) {
      //   state.data = action.payload.data;
      // } else {
      //   localStorage.removeItem("token");
      // }
    });
    builder.addCase(authenToken.rejected, (state, action) => {
      localStorage.removeItem("token");
      
    });
    // builder.addMatcher(
    //   (action) => {
    //     if (action.meta) {
    //       return action;
    //     }
    //   },
    //   (state, action) => {
    //     if (action.meta) {
    //       if (action.meta.requestStatus == "pending") {
    //         //console.log("đã vào pending của api: ", action.type)
    //         // if (action.type == "deleteUserByid/pending") {
    //         //     console.log("trường hợp pending của api delete")
    //         // }
    //         state.loading = true;
    //       }
    //       if (action.meta.requestStatus == "rejected") {
    //         //console.log("đã vào rejected của api: ", action.type)
    //         state.loading = false;
    //       }
    //       if (action.meta.requestStatus == "fulfilled") {
    //         //console.log("đã vào fulfilled của api: ", action.type)
    //         state.loading = false;
    //       }
    //     }
    //   },
    // );
  },
});

export const userActions = {
  ...userSlice.actions,
  find,
  authenToken
};

export const userReducer = userSlice.reducer;
