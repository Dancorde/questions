import React from "react";
import PropTypes from "prop-types";

const QuestionItem = ({ question, onDetail, onDelete, onEdit }) => {
  return (
    <li key={question._id}>
      {question.problem}
      <button onClick={onDetail.bind(this, question._id)}>
        View
      </button>
      <button onClick={onEdit.bind(this, question._id)}>Edit</button>
      <button onClick={onDelete.bind(this, question._id)}>
        Delete
      </button>
    </li>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.object,
  onDetail: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default QuestionItem;
