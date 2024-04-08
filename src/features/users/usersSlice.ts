// imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../../app/store"

/*
  A function that accepts an initial state, 
  an object of reducer functions, 
  and a "slice name",
  and automatically generates action creators 
  and action types that correspond to the reducers and state.
*/
export interface User {
  id?: number
  name: string
  phone: string
  email: string
}

interface UsersState {
  isLoading: boolean
  isError: boolean
  usersList: User[]
  status: string
}

const initialState: UsersState = {
  isLoading: false,
  isError: false,
  usersList: [],
  status: "idle",
}

// Let's write a fn here to connect to the backend to fetch all users
export const fetchUsersAsync = createAsyncThunk<
  User[],
  void, // for get method we are not passing any data to rest api. so void
  { state: RootState }
>(
  "users/fetchUsers", // action type a.k.a typePrefix
  async (_, { getState }) => {
    // _ represents nothing to pass to axios call
    // we neeed to connect to rest api using axios
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
    )
    return response.data
  },
)

export const addUserAsync = createAsyncThunk<
  User, // return type
  User, // for post method we are goin to pass the form data of this format
  { state: RootState }
>(
  "users/addUser", // action type a.k.a typePrefix
  async (addUserFormData, { getState }) => {
    //addUserFormData represents the data we pass to axios call
    // we neeed to connect to rest api using axios
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      addUserFormData,
    )
    return response.data
  },
)

// use createSlice function to create the slice for this feature
export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    // if you want to update the store locally w/o connecting to the backend rest api
    // write the logic here
  },
  extraReducers: (builder) => {
    // if we want to connect to rest api -- we need write some logic here
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        // state is the store data of this feature
        state.isLoading = true
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        // state is the store data of this feature
        state.isLoading = false
        state.usersList = action.payload
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        // state is the store data of this feature
        state.isLoading = false
        state.isError = true
        state.status =
          "Unable to Fetch users. Some error occurred. Try again later"
      })
      .addCase(addUserAsync.pending, (state) => {
        // state is the store data of this feature
        state.isLoading = true
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        // state is the store data of this feature
        state.isLoading = false
        state.usersList = [...state.usersList, action.payload]
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        // state is the store data of this feature
        state.isLoading = false
        state.isError = true
        state.status =
          "Unable to Add users. Some error occurred. Try again later"
      })
  },
})

// export
export default usersSlice.reducer
