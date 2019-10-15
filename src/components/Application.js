import React, { useState , useEffect } from 'react';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';
import 'components/Application.scss';
import useApplicationData from 'hooks/useApplicationData.js';


export default function Application(props) {
  const {
    state,
    dispatch,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day).map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
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
            setDay={(day) => { dispatch({ type: 'SET_DAY', day: day }) }}/>
          {/* setDay is a function,  setDay={{dispatch({type: "SET_DAY", day: day})} this steDay is just the result of dispatch,cannot be passed to child as a function*/}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}