import React, { Component, Fragment } from "react";

import Backdrop from "../backdrop/Backdrop";
import QuestionList from "../questions/questionList/QuestionList";
import Spinner from "../layout/Spinner";
import ViewQuestionModal from "../modal/viewQuestionModal/viewQuestionModal";
import CreateQuestionModal from "../modal/createQuestionModal/createQuestionModal";
import EditQuestionModal from "../modal/editQuestionModal/editQuestionModal";

import "./Home.css";

class Questions extends Component {
  state = {
    isLoading: false,
    creating: false,
    questions: [],
    selectedQuestion: null,
    editing: false,
  };

  isActive = true;

  componentDidMount() {
    this.fetchQuestions();
  }

  createQuestionHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = async () => {
    this.setState({
      creating: false,
      selectedQuestion: null,
      editing: false,
    });
  };

  modalCancelHandler = () => {
    this.setState({
      creating: false,
      selectedQuestion: null,
      editing: false,
    });
  };

  fetchQuestions() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query {
          questions {
            _id
            problem
            alternatives {
              _id
              answer
            }
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

  openEditQuestionHandler = questionId => {
    this.setState(prevState => {
      const selectedQuestion = prevState.questions.find(
        q => q._id === questionId
      );
      return { selectedQuestion: selectedQuestion, editing: true };
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
          throw new Error("Failed to delete question!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedQuestions = prevState.questions.filter(question => {
            return question._id !== questionId;
          });
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
        {(this.state.creating || this.state.selectedQuestion) && <Backdrop />}
        {this.state.creating && (
          <CreateQuestionModal
            modalCancelHandler={this.modalCancelHandler}
            modalConfirmHandler={this.modalConfirmHandler}
          />
        )}
        {this.state.selectedQuestion && !this.state.editing && (
          <ViewQuestionModal
            question={this.state.selectedQuestion}
            modalCancelHandler={this.modalCancelHandler}
          />
        )}
        {this.state.selectedQuestion && this.state.editing && (
          <EditQuestionModal
            question={this.state.selectedQuestion}
            modalCancelHandler={this.modalCancelHandler}
            modalConfirmHandler={this.modalConfirmHandler}
          />
        )}
        <div>
          <h1 className="align-left">Questions List</h1>
          <button
            className="btn btn-primary align-right"
            onClick={this.createQuestionHandler}
          >
            New Question
          </button>
        </div>
        <div style={{ clear: "both" }}>
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <QuestionList
              questionList={this.state.questions}
              onViewDetail={this.showDetailHandler}
              onDelete={this.deleteQuestionHandler}
              onEdit={this.openEditQuestionHandler}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

export default Questions;
