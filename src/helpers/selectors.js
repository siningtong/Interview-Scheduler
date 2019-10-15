export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(item => item.name===day);
  if(filteredDay.length === 0) {
    return [];
  } else{
    const dayAppointment=filteredDay[0].appointments;
    if(!filteredDay) {
      return [];
    } else if(dayAppointment.length===0) {
      return [];
    } else{
      let result =[];
      for(let element of dayAppointment) {
        result.push(state.appointments[element]);
      }
      return result;
    }
  }
}

export function getInterview(state, interview) {
  if(!interview) {
    return null;
  } else {
    const output = { ...interview };
    const interviewerObj = state.interviewers[interview.interviewer];
    output.interviewer=interviewerObj;
    return output;
  }
}


export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(item => item.name===day);
  let result = [];
  if(filteredDay.length === 0) {
    return [];
  } else{
    for(let key in state.interviewers) {
      for(let arr of filteredDay[0].interviewers) {
        if(state.interviewers[key].id === arr) {
          result.push(state.interviewers[key]);
        }
      }
    }
  }
  return result;
}