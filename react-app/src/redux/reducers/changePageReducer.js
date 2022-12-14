import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function changePageReducer(state = initialState.page, action) {
    switch (action.type) {
        case actionTypes.CHANGE_PAGE:
            return action.payload;
        default:
            return state;
    }
}