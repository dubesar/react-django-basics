import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "../features/tasks/taskSlice"

export default configureStore( {
    reducer: {
        tasks: taskReducer
    }
})