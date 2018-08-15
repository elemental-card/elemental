import React from 'react';
import '../styles/ConfirmSection.css';

const NOOP = () => undefined;

export default ({ onClick, status, label }) => (
  <div className="ConfirmSection">
    <div className={'ConfirmSection__Label--' + status}>{label}</div>
    <div
      className={'ConfirmSection__Button--' + status}
      onClick={status === 'enabled' ? onClick : NOOP}
    >
      <div className={'ConfirmSection__Icon--' + status} />
    </div>
  </div>
);
