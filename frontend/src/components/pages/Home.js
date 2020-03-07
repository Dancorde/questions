import React, { Component, Fragment } from "react";

import Modal from "../modal/Modal";
import Backdrop from "../backdrop/Backdrop";
import "./Home.css";

class Questions extends Component {
  state = {
    creating: false
  };

  constructor(props) {
    super(props);
    this.problemRef = React.createRef();
    this.answer1Ref = React.createRef();
    this.answer2Ref = React.createRef();
    this.answer3Ref = React.createRef();
    this.answer4Ref = React.createRef();
    this.answer5Ref = React.createRef();
  }

  createQuestionHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const problem = this.problemRef.current.value;
    const answer1 = this.answer1Ref.current.value;
    const answer2 = this.answer2Ref.current.value;
    const answer3 = this.answer3Ref.current.value;
    const answer4 = this.answer4Ref.current.value;
    const answer5 = this.answer5Ref.current.value;

    const question = {
      problem,
      answer1,
      answer2,
      answer3,
      answer4,
      answer5
    };

    console.log(question);

    const requestBody = {
      query: `
        mutation {
          createQuestion(questionInput: {problem: "${problem}", answer1: "${answer1}", answer2: "${answer2}", answer3: "${answer3}", answer4: "${answer4}", answer5: "${answer5}"}) {
            _id
            problem
            answer1
            answer2
            answer3
            answer4
            answer5
          }
        }
      `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to create question!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  render() {
    return (
      <Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="New Question"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form action="">
              <div>
                <label htmlFor="problem">Problem</label>
                <textarea
                  id="problem"
                  rows="3"
                  ref={this.problemRef}
                ></textarea>
              </div>
              <div>
                <label htmlFor="answer1">a.</label>
                <input
                  type="text"
                  id="answer1"
                  ref={this.answer1Ref}
                />
              </div>
              <div>
                <label htmlFor="answer2">b.</label>
                <input
                  type="text"
                  id="answer2"
                  ref={this.answer2Ref}
                />
              </div>
              <div>
                <label htmlFor="answer3">c.</label>
                <input
                  type="text"
                  id="answer3"
                  ref={this.answer3Ref}
                />
              </div>
              <div>
                <label htmlFor="answer4">d.</label>
                <input
                  type="text"
                  id="answer4"
                  ref={this.answer4Ref}
                />
              </div>
              <div>
                <label htmlFor="answer5">e.</label>
                <input
                  type="text"
                  id="answer5"
                  ref={this.answer5Ref}
                />
              </div>
            </form>
          </Modal>
        )}
        <div className="text-center">
          <button
            className="btn"
            onClick={this.createQuestionHandler}
          >
            New Question
          </button>
        </div>
      </Fragment>
    );
  }
}

export default Questions;
