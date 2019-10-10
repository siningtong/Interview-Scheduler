import React from 'react';
import 'components/InterviewerListItem.scss';
import classnames from 'classnames';

export default function InterviewerList(props) {
  const InterviewerListClass=classnames('interviewers__item', {
    'interviewers__item--selected':props.selected
  });
  return(
    <li className={InterviewerListClass} onClick={props.setInterviewer}>

      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}