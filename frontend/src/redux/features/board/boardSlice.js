import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import boardService from "./boardService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    boards: [],
    selectedBoard: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getBoard = createAsyncThunk(
    "board/getBoard",
    async (id, thunkAPI) => {
        try {
            return await boardService.getBoard(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteBoard = createAsyncThunk(
    "board/deleteBoard",
    async (id, thunkAPI) => {
        try {
            return await boardService.deleteBoard(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateBoard = createAsyncThunk(
    "board/updateBoard",
    async (data, thunkAPI) => {
        try {
            return await boardService.updateBoard(data);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAllBoards = createAsyncThunk(
    "board/getAllBoards",
    async (_, thunkAPI) => {
        try {
            return await boardService.getAllBoards();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createBoard = createAsyncThunk(
    "board/createBoard",
    async (data, thunkAPI) => {
        try {
            return await boardService.createBoard(data);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.selectedBoard = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBoards.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBoards.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.boards = action.payload;
            })
            .addCase(getAllBoards.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBoard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBoard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.selectedBoard = action.payload;
            })
            .addCase(getBoard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateBoard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBoard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.selectedBoard = action.payload;
            })
            .addCase(updateBoard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteBoard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBoard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.selectedBoard = null;
            })
            .addCase(deleteBoard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createBoard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.boards.push(action.payload);
            })
            .addCase(createBoard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = boardSlice.actions;
export default boardSlice.reducer;
