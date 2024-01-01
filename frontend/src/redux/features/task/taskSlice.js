import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
    tasks: [],
    selectedTask: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createTask = createAsyncThunk(
    "task/createTask",
    async (data, thunkAPI) => {
        try {
            return await taskService.createTask(data);
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

export const getTask = createAsyncThunk(
    "task/getTask",
    async (id, thunkAPI) => {
        try {
            return await taskService.getTask(id);
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

export const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async (id, thunkAPI) => {
        try {
            return await taskService.deleteTask(id);
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

export const getAllTasks = createAsyncThunk(
    "task/getAllTasks",
    async (id, thunkAPI) => {
        try {
            return await taskService.getAllTasks(id);
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

export const updateTask = createAsyncThunk(
    "task/updateTask",
    async (data, thunkAPI) => {
        try {
            return await taskService.updateTask(data);
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

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTask.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.selectedTask = action.payload;
            })
            .addCase(getTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks = action.payload;
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.selectedTask = action.payload;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
