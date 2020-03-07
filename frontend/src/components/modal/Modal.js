import React from "react";
import PropTypes from "prop-types";

import "./Modal.css";

const Modal = props => {
  return (
    <div className="modal">
      <header className="modal-header">
        <h1>{props.title}</h1>
      </header>
      <section className="modal-content">{props.children}</section>
      <section className="modal-actions">
        {props.canCancel && (
          <button className="btn" onClick={props.onCancel}>
            Cancel
          </button>
        )}
        {props.canConfirm && (
          <button className="btn" onClick={props.onConfirm}>
            Confirm
          </button>
        )}
      </section>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  canCancel: PropTypes.bool,
  canConfirm: PropTypes.bool
};

export default Modal;
