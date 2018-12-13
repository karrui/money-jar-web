import * as React from "react";

const Contributors = ({ contributors }) => {
  return (
    <div className="contributor-wrapper">
      {Object.keys(contributors).map((key) => {
        const user = key;
        const amount = contributors[key];
        return (
          <div className="contributor" key={key}>
            <span className="name">{user}</span>
            <span className={`amount ${amount > 0 ? 'positive' : 'negative'}`}>
              {amount > 0 ? '+' : '-'}
              ${amount.toFixed(2)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Contributors;
