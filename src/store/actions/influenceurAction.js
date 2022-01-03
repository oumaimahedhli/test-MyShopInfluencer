import { onValue1, getInfluenceur } from "../../firebase";

import { GET_INFLUENCEUR, INFLUENCEUR_STATUS } from "../actionTypes";

export function getinfluenceur() {
    return  (dispatch) => {
      // as soon as this function fires, show loading to be true
      dispatch({
        type: INFLUENCEUR_STATUS,
        payload: true,
      });
      onValue1(getInfluenceur, (snapshot) => {
        dispatch({
            type: GET_INFLUENCEUR,
            payload: snapshot.val(),
          });
          dispatch({
            type: INFLUENCEUR_STATUS,
            payload: false,
          });
      });
     
     /*   (snapshot) => {
        if (snapshot.exists()) {
         
          dispatch({
            type: GET_INFLUENCEUR,
            payload: snapshot.val(),
          });
          dispatch({
            type: INFLUENCEUR_STATUS,
            payload: false,
          });
        } else {
          dispatch({
            type: INFLUENCEUR_STATUS,
            payload: -1,
          });
        }
      }).catch((error) => {
          
        console.error(error);
      }); */
      
    };
  }