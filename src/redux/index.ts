import { combineReducers } from "redux";
import auth from "./reducer/auth";

const rootReducer = combineReducers({ auth });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
