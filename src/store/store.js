import {configureStore} from "@reduxjs/toolkit";

const AppReducer = (state ={})=>{
    return state;
}

export const store = configureStore({
    reducer:{
        app: AppReducer
    }
})
