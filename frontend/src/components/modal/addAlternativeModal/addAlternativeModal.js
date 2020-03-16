import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "../Modal";

export class AddAlternativeModal extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  };

  state = {
    answer: "",
  };

  modalConfirmHandler = () => {
    this.props.modalConfirmHandler({
      selectedQuestion: null,
      editing: false,
      isLoading: true,
      adding: false,
    });
    const questionId = this.props.question._id;

    const requestBody = {
      query: `
        mutation {
          addAlternative(questionId:"${questionId}", alternativeInput:{answer: "${this.state.answer}"}),{
            answer
          }
        }
      `,
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to add alternative!");
        }
        return res.json();
      })
      .then(resData => {})
      .catch(error => {
        console.log(error);
      });
  };

  modalCancelHandler = () => {
    this.props.modalCancelHandler({
      adding: false,
    });
  };

  handleChange = event => {
    this.setState({ answer: event.target.value });
  };

  render() {
    return (
      <Modal
        title="Add Alternative"
        canCancel
        canConfirm
        onCancel={this.modalCancelHandler}
        onConfirm={this.modalConfirmHandler}
      >
        <form>
          <div>
            <label htmlFor="answer">Answer</label>
            <textarea
              id="answer"
              rows="3"
              value={this.state.answer}
              onChange={this.handleChange}
            ></textarea>
          </div>
        </form>
      </Modal>
    );
  }
}

export default AddAlternativeModal;
