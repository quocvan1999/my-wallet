import React, { useState } from "react";
import HistoryItem from "./HistoryItem";
import ModalWallet from "./ModalWallet";
import { Modal } from "bootstrap";

const MyWallet = () => {
  const contentModalDeposit = {
    type: 0,
    title: "Nạp tiền",
    inputTitle: "Số tiền cần nạp",
    inputPlaceholder: "Nhập số tiền cần nạp",
    buttonTitle: "Nạp tiền",
  };

  const contentModalWithdraw = {
    type: 1,
    title: "Rút tiền",
    inputTitle: "Số tiền cần rút",
    inputPlaceholder: "Nhập số tiền cần rút",
    buttonTitle: "Rút tiền",
  };

  const getFormattedDateTime = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString("default", { month: "short" });
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day} ${month} ${hours}:${minutes}${ampm}`;
  };

  const [modalContent, setModalContent] = useState({});
  const [inputValue, setInputValue] = useState(0);
  const [balance, setBalance] = useState(0);
  const [logInput, setLogInput] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [showModal, setShowModal] = useState("");

  const handleChangeSubmit = (type) => {
    const newTransaction = {
      type: type === 0 ? "Deposit" : "Withdraw",
      amount: inputValue,
      timestamp: getFormattedDateTime(),
    };

    if (type === 0) {
      if (inputValue !== "" && inputValue > 0) {
        setBalance(balance + inputValue);
        reset();
        alert("Nạp tiền thành công");
      } else {
        setLogInput("Số tiền phải lớn hơn 0");
        return;
      }
    } else {
      if (inputValue !== "" && +inputValue <= balance && +inputValue > 0) {
        setBalance(balance - inputValue);
        reset();
        alert("Rút tiền thành công");
      } else {
        setLogInput("Số tiền phải nhỏ hơn hoặc bằng số dư");
        return;
      }
    }
    setTransactionHistory([...transactionHistory, newTransaction]);
  };

  const handleCloseModal = () => {
    reset();
  };

  const handleOpenModal = (type) => {
    reset();
    setModalContent(type === 0 ? contentModalDeposit : contentModalWithdraw);
  };

  const handleChangeInput = (value, type) => {
    if (type === 0) {
      value !== "" && +value > 0 ? setShowModal("modal") : setShowModal("");
    } else {
      value !== "" && +value > 0 && +value <= balance
        ? setShowModal("modal")
        : setShowModal("");
    }
    setInputValue(+value);
  };

  const reset = () => {
    setShowModal("");
    setLogInput("");
    setInputValue("");
  };

  return (
    <div className="w-100 text-center d-flex flex-column justify-content-center align-items-center py-5">
      <h2 className="text-white mb-4">My Wallet</h2>
      <p className="mb-0 fs-2 fw-bold text-warning">
        {balance.toLocaleString("de-DE")}$
      </p>
      <p className="text-white">Total balance</p>
      <div className="mt-3 d-flex gap-2">
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#modalWallet"
          onClick={() => {
            handleOpenModal(0);
          }}
        >
          Deposit
        </button>
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#modalWallet"
          onClick={() => {
            handleOpenModal(1);
          }}
        >
          Withdraw
        </button>
      </div>
      <h3 className="text-white mt-5">Transaction History</h3>
      <div className="w-75 bg-white">
        {transactionHistory.length > 0 ? (
          <table className="table w-100 mb-0">
            <tbody>
              {transactionHistory.map((transaction, index) => (
                <HistoryItem key={index} transaction={transaction} />
              ))}
            </tbody>
          </table>
        ) : (
          "No transaction history"
        )}
      </div>
      <ModalWallet
        handleChangeInput={handleChangeInput}
        handleChangeSubmit={handleChangeSubmit}
        handleCloseModal={handleCloseModal}
        modalContent={modalContent}
        logInput={logInput}
        inputValue={inputValue}
        showModal={showModal}
      />
    </div>
  );
};

export default MyWallet;
