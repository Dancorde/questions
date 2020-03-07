import React from "react";
import PropTypes from "prop-types";

const QuestionItem = ({ question, onDetail, onDelete }) => {
  return (
    <li key={question._id}>
      {question.problem}
      <button onClick={onDetail.bind(this, question._id)}>
        View
      </button>
      <button>Edit</button>
      <button onClick={onDelete.bind(this, question._id)}>
        Delete
      </button>
    </li>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.object,
  onDetail: PropTypes.func,
  onDelete: PropTypes.func
};

export default QuestionItem;
