import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  const interviewers = props.interviewers.map((item) => {
    return(
      <InterviewerListItem
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={item.id===props.value}
        setInterviewer={event => props.onChange(item.id)}
      />
    );
  });
  return <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>;
}