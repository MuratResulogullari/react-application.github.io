import { combineReducers } from "redux";
import changeCategoryReducer from './changeCategoryReducer'
import categoryListReducer from './categoryListReducer'
import productListReducer from './productListReducer'
import changePageReducer from './changePageReducer'
import changePagePerCountReducer from './changePagePerCountReducer'
import cartReducer from "./cartReducer";
import saveProductReducer from "./saveProductReducer";

const rootReducer = combineReducers({
    //     changeCategoryReducer: changeCategoryReducer same down code
    changeCategoryReducer,
    categoryListReducer,
    productListReducer,
    changePageReducer,
    changePagePerCountReducer,
    cartReducer,
    saveProductReducer,
});

export default rootReducer;