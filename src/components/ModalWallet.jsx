import React from "react";

const ModalWallet = ({
  modalContent,
  handleChangeInput,
  logInput,
  handleChangeSubmit,
  handleCloseModal,
  inputValue,
}) => {
  const { type, title, inputTitle, inputPlaceholder, buttonTitle } =
    modalContent;

  return (
    <div
      className="modal fade"
      id="modalWallet"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <label className="d-block text-start fw-bold" htmlFor="inputAmount">
              {inputTitle}{" "}
              <span className="text-danger fw-light fst-italic">
                {logInput ? `(${logInput})` : ""}
              </span>
            </label>
            <input
              type="number"
              className="form-control"
              id="inputAmount"
              name="inputAmount"
              placeholder={inputPlaceholder}
              value={inputValue}
              onChange={(e) => {
                handleChangeInput(e.target.value);
              }}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              onClick={() => {
                handleChangeSubmit(type);
              }}
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              {buttonTitle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWallet;
