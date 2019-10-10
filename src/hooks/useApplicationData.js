import React, { useState ,useEffect,useReducer} from "react";
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_DAYS,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData(){

//   const SET_DAY = "SET_DAY";
//   const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
//   const SET_INTERVIEW = "SET_INTERVIEW";
//   const SET_DAYS = "SET_DAYS"

//   function reducer(state, action) {
//     switch (action.type) {
//       case SET_DAY:
//         return { ...state, day: action.day}
//       case SET_APPLICATION_DATA://initialize application data,first load data from server
//         return {...state, 
//           days:action.days, 
//           appointments:action.appointments,
//           interviewers:action.interviewers,
//           // interview:action.interview
//         }
//       case SET_INTERVIEW: {
        
//         return {...state,appointments:action.appointments}
//       }
//       case SET_DAYS:
//         return {...state,days:action.days}
//       default:
//         throw new Error(
//           `Tried to reduce with unsupported action type: ${action.type}`
//         );
//     }
// }

// setState({..state. fgfgd})
// dispatch

// const dispatch = function(action) {
//   let state = state
//   setState(reducer(state, action))
// }

// [state, setState] = useState(....);
// [state, dispatch] = useReducer(reducer);



// const useReducer = function(myReducer, initData) {
//   const [state, setState] = useState(initData)

//   // const state = useState(initData)[0]
//   // const setState = useState(initData)[1]


//   const dispatch = function(action) {
//     setState(myReducer(state, action))
//   }


//   return [state, dispatch]
// }





  const [state, dispatch] = useReducer(reducer,{
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{},
    interview:{}
  });
  {/*const setDay = newDay => setState({ ...state, day: newDay }); a more clear way to write the code d*/}
  // const setDay = day => setState({ ...state, day });
  useEffect(()=>{
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all)=>{
      dispatch(
        {type: SET_APPLICATION_DATA, 
          days:all[0].data, 
          appointments: all[1].data,
          interviewers:all[2].data}
        // prev => ({...prev, days:all[0].data, appointments: all[1].data,interviewers:all[2].data})
        );
    })
  },[])


function addSpots (change){
  const newDays = state.days.map((item)=>{
    if(item.name === state.day){
      return {...item, spots:item.spots+change}
    } else {
      return {...item}
    } 
  })
  dispatch({type:SET_DAYS,days:newDays})
}


  function bookInterview(id, interview,isEdit) {
    const appointment = {
      ...state.appointments[id], // { the appointment just created}
      interview: { ...interview }
    };
    const appointments = {//all the appointments in state
      ...state.appointments,
      [id]: appointment//[id] id is a variable
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(
      () => {
        dispatch(
          {type:SET_INTERVIEW,
            appointments
          }
        //   prevState => ({
        //   ...prevState,
        //   appointments
        // })
        )
        if(!isEdit){
          addSpots(-1)
        }
        
      // dispatch(
      //   {type:SET_DAYS,days:days}
      // )
      }
    )}
    const cancelInterview = function(id){
      const cancleAppointment ={
        ...state.appointments[id],
        interview:null
      }
      const appointments={
        ...state.appointments,
        [id]:cancleAppointment
      }
      return axios.delete(`/api/appointments/${id}`)
      .then(
        ()=>{
          dispatch(
            {type:SET_INTERVIEW,
              appointments
            }
            
          //   prevState => ({
          //   ...prevState,
          //   appointments
          // })
          )
          addSpots(1)
        }
      )
    }
    return {
      state,
      dispatch,
      bookInterview,
      cancelInterview
    }
    
}