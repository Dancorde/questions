import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Modal from "../Modal";

export class viewQuestionModal extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  };

  modalCancelHandler = () => {
    this.props.modalCancelHandler({
      creating: false,
      selectedQuestion: null,
      editing: false,
    });
  };

  render() {
    const alternatives = this.props.question.alternatives;

    return (
      <Modal title="View Question" canCancel onCancel={this.modalCancelHandler}>
        <p>{this.props.question.problem}</p>
        <ul>
          {alternatives.map(alternative => {
            return (
              <li key={alternative._id}>
                <input
                  type="radio"
                  value={alternative.answer}
                  name="answer"
                ></input>
                <label style={{ padding: "5px" }}>{alternative.answer}</label>
              </li>
            );
          })}
        </ul>
      </Modal>
    );
  }
}

export default viewQuestionModal;
