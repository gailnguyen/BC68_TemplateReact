import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungService } from "../services/nguoiDung.service";

export const getValueUserApi = createAsyncThunk(
  "nguoiDung/getValueUserApi",
  async (_, ThunkAPI) => {
    const result = await nguoiDungService.getAllUsers();
    // console.log(result);
    return result.data.content;
  }
);

const initialState = {
  listUsers: [],
};

const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {},
  //   bắt tác vụ đang sử dụng Thunk
  extraReducers: (builder) => {
    builder.addCase(getValueUserApi.fulfilled, (state, action) => {
      //   console.log(action);
      state.listUsers = action.payload;
    });
    builder.addCase(getValueUserApi.pending, (state, action) => {
      console.log("Tôi đang chờ xử lý");
    });
    builder.addCase(getValueUserApi.rejected, (state, action) => {
      console.log("Tôi bị lỗi");
    });
  },
});

export const {} = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
