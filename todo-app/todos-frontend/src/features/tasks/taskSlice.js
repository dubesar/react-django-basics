import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk(
    'task/getTasks',
    async () => {
        return fetch( "http://127.0.0.1:8000/todo/" ).then( ( res ) => res.json() );
    }
)

const taskSlice = createSlice( {
    name: 'task',
    initialState: {
        taskList:[],
        status: null,
    },
    extraReducers: {
        [getTasks.pending]: ( state, action ) => {
            state.status = 'loading'
        },
        [getTasks.fulfilled]: ( state, {payload} ) => {
            state.list = payload
            state.status = 'success'
        },
        [getTasks.rejected]: ( state, action ) => {
            state.status='failed'
        }
    }
} )

export default taskSlice.reducer