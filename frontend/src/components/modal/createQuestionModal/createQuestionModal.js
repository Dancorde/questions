import React, { Component } from "react";

import Modal from "../Modal";

export class CreateQuestionModal extends Component {
  state = {
    problem: "",
  };

  modalConfirmHandler = () => {
    this.props.modalConfirmHandler({
      creating: false,
    });

    const requestBody = {
      query: `
        mutation {
          createQuestion(questionInput:{problem:"${this.state.problem}"}),{
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
          throw new Error("Failed to create question!");
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
        </form>
      </Modal>
    );
  }
}

export default CreateQuestionModal;
