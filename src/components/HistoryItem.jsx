import React from "react";

const HistoryItem = ({ transaction }) => {
  const { type, amount, timestamp } = transaction;
  return (
    <tr
      className={
        type === "Deposit"
          ? "bg-success bg-opacity-50"
          : "bg-danger bg-opacity-50"
      }
    >
      <td className="bg-transparent">{type}</td>
      <td className="bg-transparent">${amount.toLocaleString("de-DE")}</td>
      <td className="bg-transparent">{timestamp}</td>
    </tr>
  );
};

export default HistoryItem;
