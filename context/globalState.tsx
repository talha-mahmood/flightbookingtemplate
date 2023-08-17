import { stat } from "fs";
import React, { Children, createContext, useReducer } from "react";
import type { flt } from "../interfaces/index";
type Props = {
  showdetails: Boolean;
  flightdetails: flt | {};
  return_journey: Boolean;
  twowaydetails: {
    "going": flt,
    "coming":flt
  } | {}
}
type ContextType = {
  show: Boolean,
  flightdetails:flt,
  changeShow: () => void,
  flightDetails: (details: flt) => void,
  twowayjourney: (details: { "going": flt, "coming": flt }) => void,
  return_journey:flt,
  twowaydetails:{ "going": flt, "coming": flt }
}
export type IAppAction =
  | { type: 'SHOW'; payload: null }
  | { type: 'FLIGHT_DETAILS'; payload: flt }
  | { type: 'TWO_WAY'; payload:{"going":flt,"coming":flt}};

interface IAppModel{
  state: Props;
  dispatch: React.Dispatch<IAppAction>;
}
const InitialState:Props = {
  showdetails: false,
  flightdetails: {},
  return_journey: false,
  twowaydetails:{}
  
}

export const GlobalContext = createContext<Props>(InitialState);

const AppReducer = (state:Props, action:IAppAction) => {
  switch (action.type) {
    case "SHOW":
      return {
        ...state,
        showdetails:!state.showdetails
      }
    case "FLIGHT_DETAILS":
      return {
        ...state,
        return_journey:false,
        flightdetails:action.payload
      }
    case "TWO_WAY":
      return {
        ...state,
        flightDetails: {},
        return_journey: true,
        twowaydetails:action.payload
      }
    default: return;
  }
}
export const GlobalProvider:React.FC<ContextType> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, InitialState);

  function changeShow() {
    dispatch({
      type: "SHOW"
    })
   
  }
  function flightDetails(details:flt){
    dispatch({
      type: "FLIGHT_DETAILS",
      payload:details
    })

  }
  function twowayjourney(details:{"going":flt,"coming":flt}):IAppAction {
    dispatch({
      type: "TWO_WAY",
      payload:details
    })
  }
  return(
    <GlobalContext.Provider
      value={{
        show: state.showdetails,
        flightdetails: state.flightdetails,
        changeShow, flightDetails, twowayjourney,
        return_journey: state.return_journey,
        twowaydetails:state.twowaydetails
        
      }}>
  {children}
    </GlobalContext.Provider>
  )
}
