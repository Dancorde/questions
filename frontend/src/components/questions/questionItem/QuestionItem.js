import React from "react";
import PropTypes from "prop-types";

const QuestionItem = ({ question, onDetail }) => {
  return (
    <li key={question._id}>
      {question.problem}
      <button onClick={onDetail.bind(this, question._id)}>
        View Question
      </button>
    </li>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.object,
  onDetail: PropTypes.func
};

export default QuestionItem;
