import { Store, combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { userSlice, initialState } from './slice/slice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

const preloadedState = () => {
  return { user: initialState };
};

export type StoreState = ReturnType<typeof preloadedState>;

export type ReduxStore = Store<StoreState>;

// const createStore = () => {
//   const middlewareList = [...getDefaultMiddleware()]//, logger];

//   return configureStore({
    // reducer: rootReducer,
    // middleware: middlewareList,
    // devTools: process.env.NODE_ENV !== 'production',
    // preloadedState: preloadedState(),
//   });
// };

const middlewareList = [...getDefaultMiddleware(), logger]
const store = configureStore({
  reducer: rootReducer,
  middleware: middlewareList,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: preloadedState(),
})


export default store;