import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function changePagePerCountReducer(state = initialState.pagePerCount, action) {
    switch (action.type) {
        case actionTypes.CHANGE_PAGEPERCOUNT:
            return action.payload;
        default:
            return state;
    }
}