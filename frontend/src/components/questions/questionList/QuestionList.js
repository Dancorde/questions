import React from "react";
import PropTypes from "prop-types";

import QuestionItem from "../questionItem/QuestionItem";

const QuestionList = ({ questionList, onViewDetail, onDelete }) => {
  const questions = questionList.map(question => {
    return (
      <QuestionItem
        key={question._id}
        question={question}
        onDetail={onViewDetail}
        onDelete={onDelete}
      />
    );
  });
  return <ul>{questions}</ul>;
};

QuestionList.propTypes = {
  questionList: PropTypes.array,
  onViewDetail: PropTypes.func,
  onDelete: PropTypes.func
};

export default QuestionList;
