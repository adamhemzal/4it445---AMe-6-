import React, { Component } from 'react';

const CustomFrame = ({title, editable, children, onRemove }) => {
  return (
      <div className="widget__outer custom-frame-container">
        <div className="title widget__edit">
            {editable &&
                    <div>
                        <a className="btn" onClick={() => {editWidget();}} >Edit</a>
                        <a className="btn" onClick={() => {onRemove();}} >Remove</a>
                    </div>
            }
        </div>
        <div className="custom-frame-content">
          {children}
        </div>
    </div>
  );
};

const editWidget = () => {
    console.log(this);
    return;
};

export default CustomFrame;
