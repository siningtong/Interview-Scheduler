import React, { useState ,useEffect} from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';
import {getAppointmentsForDay,getInterview,getInterviewersForDay} from "helpers/selectors"
import "components/Application.scss";




export default function Application(props) {
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers:{},
  interview:{}
});
{/*const setDay = newDay => setState({ ...state, day: newDay }); a more clear way to write the code d*/}
const setDay = day => setState({ ...state, day });
  useEffect(()=>{
    Promise.all([
      Promise.resolve(axios("/api/days")),
      Promise.resolve(axios("/api/appointments")),
      Promise.resolve(axios("/api/interviewers"))
    ]).then((all)=>{
      setState(prev => ({...prev, days:all[0].data, appointments: all[1].data,interviewers:all[2].data}));
    })
  },[])

  
  // book interview
  function bookInterview(id, interview) {
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
        setState(prevState => ({
          ...prevState,
          appointments
        }))
      }
    )}
  //if not returning the promise of axios,call the bookInterview function will return undefined. In index file, we call bookInterview, we need the returned promise to .then.

//cancle interview
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
        setState(prevState => ({
          ...prevState,
          appointments
        }))
      }
    )
  }


  const appointments = getAppointmentsForDay(state, state.day)
  
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state,state.day)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"/>

        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
       {schedule}
       <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}