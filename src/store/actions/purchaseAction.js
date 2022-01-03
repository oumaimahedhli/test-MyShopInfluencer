import { onValue1, getALLPurchases } from "../../firebase";

import { GET_PURCHASE, PURCHASE_STATUS } from "../actionTypes";

export function getPurchases() {
    return  (dispatch) => {
      // as soon as this function fires, show loading to be true
      dispatch({
        type: PURCHASE_STATUS,
        payload: true,
      });
      onValue1(getALLPurchases, (snapshot) => {
        dispatch({
            type: GET_PURCHASE,
            payload: snapshot.val(),
          });
          dispatch({
            type: PURCHASE_STATUS,
            payload: false,
          });
      });
     
     /*   (snapshot) => {
        if (snapshot.exists()) {
         
          dispatch({
            type: GET_PURCHASE,
            payload: snapshot.val(),
          });
          dispatch({
            type: PURCHASE_STATUS,
            payload: false,
          });
        } else {
          dispatch({
            type: PURCHASE_STATUS,
            payload: -1,
          });
        }
      }).catch((error) => {
          
        console.error(error);
      }); */
      
    };
  }