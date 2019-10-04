import "components/Appointment/styles.scss"
import React, { Fragment } from 'react'
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import useVisualMode from "hooks/useVisualMode.js"
import Form from "components/Appointment/Form.js"
import Status from "components/Appointment/Status.js"
import Confirm from "components/Appointment/Confirm.js"
import Error from "components/Appointment/Error.js"



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE="DELETE";
const EDITE="EDITE";
const ERROR_SAVE="ERROR_SAVE";
const ERROR_DELETE ="ERROR_DELETE"




export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );  

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id,interview)
    .then(() => transition(SHOW))
    .catch(()=>transition(ERROR_SAVE,true)) 
  }
  //delete appointment
  const cancel =  () => {
    transition(CONFIRM)
    
  }
  const delate = ()=>{
    transition(DELETE)
    props.cancelInterview(props.id,props.interview)
    .then(()=>transition(Empty))
    .catch(()=>transition(ERROR_DELETE,true))
  }

  //Edite appointment
const edite =()=>{
  transition(EDITE)
}

//all the transition should within the Appointment component, not in application component

return ( <article className="appointment">
  
  <Header time={props.time}/>
  {/* if onAdd={transition("CREATE"),the transition is called right away,but we need to wait for some event happen then call it,so use callback */}
  {mode === EMPTY && <Empty onAdd={(event) => transition(CREATE)} />}
  {mode === SHOW &&  <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={cancel} onEdit={edite}/>} 
  {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
  {mode === SAVING && <Status message={"SAVING"} />}
  {mode === CONFIRM && <Confirm message={"Are you sure you want to delete?"} onCancel={back} onConfirm={delate}/>}
  {mode === DELETE && <Status message={"DELETING"} />}
  {mode === EDITE && <Form interviewer={props.interview.interviewer.id} name={props.interview.student} interviewers={props.interviewers} onCancel={back} onSave={save}/>}
  {/* in from, it expect a props called name,so cant use student as props for edite mode */}
  {mode === ERROR_SAVE && <Error message={"Cannot save"} onClose={back}/>}
  {mode === ERROR_DELETE && <Error message={"Cannot delete"} onClose={back}/>}

</article>)
}



