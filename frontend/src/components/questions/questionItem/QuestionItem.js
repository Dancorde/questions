import React from "react";
import PropTypes from "prop-types";

import "./QuestionItem.css";

const QuestionItem = ({ question, onDetail, onDelete, onEdit, onAdd }) => {
  return (
    <div className="card">
      <div className="problem">{question.problem}</div>
      <br />
      <div className="text-center">
        <button
          className="btn btn-primary btn-sm"
          onClick={onAdd.bind(this, question._id)}
        >
          Add Alternative
        </button>
      </div>
      <br />
      <div className="actions">
        <button
          className="btn btn-primary btn-sm"
          onClick={onDetail.bind(this, question._id)}
        >
          <i className="fa fa-eye"> View</i>
        </button>
        <button
          className="btn btn-warning btn-sm"
          onClick={onEdit.bind(this, question._id)}
        >
          <i className="fa fa-edit"> Edit</i>
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={onDelete.bind(this, question._id)}
        >
          <i className="fa fa-trash"> Delete</i>
        </button>
      </div>
    </div>
  );
};

QuestionItem.propTypes = {
  question: PropTypes.object,
  onDetail: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default QuestionItem;
