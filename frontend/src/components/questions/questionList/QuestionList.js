import React from "react";
import PropTypes from "prop-types";

import "./QuestionList.css";
import QuestionItem from "../questionItem/QuestionItem";

const QuestionList = ({
  questionList,
  onViewDetail,
  onDelete,
  onEdit
}) => {
  return (
    <div className="questions-container">
      {questionList.map(question => (
        <QuestionItem
          key={question._id}
          question={question}
          onDetail={onViewDetail}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

QuestionList.propTypes = {
  questionList: PropTypes.array,
  onViewDetail: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default QuestionList;
