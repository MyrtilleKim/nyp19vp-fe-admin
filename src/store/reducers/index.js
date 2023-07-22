// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import user from "./user";
import auth from "./auth";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, user, auth });

export default reducers;
