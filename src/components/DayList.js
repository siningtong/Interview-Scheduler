import React from "react";
import DayListItem from "components/DayListItem"

export default function DayList (props) {
 const days = props.days.map((day)=>{

  
    return (
      <DayListItem 
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  />
    )
  })

  return <ul>{days}</ul>
  {/* if put <ul></ul> before <DayListItem >,will return three <ul> in the brower. but we just want one <ul>with three <li>in it */}
}


