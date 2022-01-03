import {  getALL ,onValue1,getBrandbyId} from "../../firebase";

import { GET_BRANDS, BRANDS_STATUS } from "../actionTypes";

export function getBrands() {
    return (dispatch) => {
      // as soon as this function fires, show loading to be true
      dispatch({
        type: BRANDS_STATUS,
        payload: true,
      });
     
      getALL.then((snapshot) => {
        if (snapshot.exists()) {
         
          dispatch({
            type: GET_BRANDS,
            payload: snapshot.val(),
          });
          dispatch({
            type: BRANDS_STATUS,
            payload: false,
          });
        } else {
          dispatch({
            type: BRANDS_STATUS,
            payload: -1,
          });
        }
      }).catch((error) => {
        console.error(error);
      });
      
    };
  }

  export function getBrandById(brandId) {
    return (dispatch) => {
      // as soon as this function fires, show loading to be true
      dispatch({
        type: BRANDS_STATUS,
        payload: true,
      });
      
      onValue1(getBrandbyId, (snapshot) => {
        dispatch({
            type: GET_BRANDS,
            payload: snapshot.val()
          });
          dispatch({
            type: BRANDS_STATUS,
            payload: false,
          });
      });
    
      
    };
  }