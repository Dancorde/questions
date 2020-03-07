import React, { Component, Fragment } from "react";

import Modal from "../modal/Modal";
import Backdrop from "../backdrop/Backdrop";
import QuestionList from "../questions/questionList/QuestionList";
import Spinner from "../layout/Spinner";

import "./Home.css";

class Questions extends Component {
  state = {
    isLoading: false,
    creating: false,
    questions: [],
    selectedQuestion: null
  };

  isActive = true;

  constructor(props) {
    super(props);
    this.problemRef = React.createRef();
    this.answer1Ref = React.createRef();
    this.answer2Ref = React.createRef();
    this.answer3Ref = React.createRef();
    this.answer4Ref = React.createRef();
    this.answer5Ref = React.createRef();
  }

  componentDidMount() {
    this.fetchQuestions();
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
        this.setState(prevState => {
          const updatedQuestions = [...prevState.questions];
          updatedQuestions.push({
            _id: resData.data.createdQuestion._id,
            problem: resData.data.createdQuestion.problem,
            answer1: resData.data.createdQuestion.answer1,
            answer2: resData.data.createdQuestion.answer2,
            answer3: resData.data.createdQuestion.answer3,
            answer4: resData.data.createdQuestion.answer4,
            answer5: resData.data.createdQuestion.answer5
          });
          return { questions: updatedQuestions };
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedQuestion: null });
  };

  editQuestionHandler = () => {};

  fetchQuestions() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query {
          questions {
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
          throw new Error("Failed to fetch question!");
        }
        return res.json();
      })
      .then(resData => {
        const questions = resData.data.questions;
        if (this.isActive) {
          this.setState({ questions: questions, isLoading: false });
        }
      })
      .catch(error => {
        console.log(error);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  showDetailHandler = questionId => {
    this.setState(prevState => {
      const selectedQuestion = prevState.questions.find(
        q => q._id === questionId
      );
      return { selectedQuestion: selectedQuestion };
    });
  };

  deleteQuestionHandler = questionId => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        mutation {
          deleteQuestion(questionId: "${questionId}") {
            _id
            problem
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
          throw new Error("Failed to delete question!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedQuestions = prevState.questions.filter(
            question => {
              return question._id !== questionId;
            }
          );
          return { questions: updatedQuestions, isLoading: false };
        });
      })
      .catch(error => {
        console.log(error);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <Fragment>
        {(this.state.creating || this.state.selectedQuestion) && (
          <Backdrop />
        )}
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
        {this.state.selectedQuestion && (
          <Modal
            title="View Question"
            canCancel
            onCancel={this.modalCancelHandler}
          >
            <p>{this.state.selectedQuestion.problem}</p>
            <p>{this.state.selectedQuestion.answer1}</p>
            <p>{this.state.selectedQuestion.answer2}</p>
            <p>{this.state.selectedQuestion.answer3}</p>
            <p>{this.state.selectedQuestion.answer4}</p>
            <p>{this.state.selectedQuestion.answer5}</p>
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
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <QuestionList
            questionList={this.state.questions}
            onViewDetail={this.showDetailHandler}
            onDelete={this.deleteQuestionHandler}
          />
        )}
      </Fragment>
    );
  }
}

export default Questions;
