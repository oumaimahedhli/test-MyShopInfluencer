import { combineReducers } from "redux";
import brandReducer from "./brandReducer";
import purchaseReducer from "./purchaseReducer";
import influenceurReducer from "./influenceurReducer";
const rootReducer = combineReducers({
  brand: brandReducer,
  purchase:purchaseReducer ,
  influenceur:influenceurReducer
 
});

export default rootReducer;