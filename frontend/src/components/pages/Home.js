import React, { Component, Fragment } from "react";

import Modal from "../modal/Modal";
import "./Home.css";

class Questions extends Component {
  render() {
    return (
      <Fragment>
        <Modal title="New Question" canCancel canConfirm>
          <p>Content</p>
        </Modal>
        <div className="text-center">
          <button>New Question</button>
        </div>
      </Fragment>
    );
  }
}

export default Questions;
