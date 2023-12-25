import {createSlice} from "@reduxjs/toolkit";
export const userSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
       
    },
    reducers:{
        setUser:(state,action)=>{
            console.log('setUser reducer is being executed');
            state.user=action.payload;
        }
    }
});

export const {setUser}=userSlice.actions;