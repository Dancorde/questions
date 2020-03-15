import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "../Modal";

export class EditQuestionModal extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  };

  state = {
    problem: this.props.question.problem,
  };

  modalConfirmHandler = () => {
    this.props.modalConfirmHandler({
      selectedQuestion: null,
      editing: false,
      isLoading: true,
    });

    const requestBody = {
      query: `
        mutation {
          updateQuestion(questionId:"${this.props.question._id}", questionInput:{problem: "${this.state.problem}"}),{
            problem
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
          throw new Error("Failed to update question!");
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
      creating: false,
      selectedQuestion: null,
      editing: false,
    });
  };

  handleChange = event => {
    this.setState({ problem: event.target.value });
  };

  render() {
    const alternatives = this.props.question.alternatives;
    return (
      <Modal
        title="New Question"
        canCancel
        canConfirm
        onCancel={this.modalCancelHandler}
        onConfirm={this.modalConfirmHandler}
      >
        <form>
          <div>
            <label htmlFor="problem">Problem</label>
            <textarea
              id="problem"
              rows="3"
              value={this.state.problem}
              onChange={this.handleChange}
            ></textarea>
          </div>
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
        </form>
      </Modal>
    );
  }
}

export default EditQuestionModal;
