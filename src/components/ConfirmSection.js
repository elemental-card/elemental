import React from 'react';
import '../styles/ConfirmSection.css';

const NOOP = () => undefined;

const getLabelClassName = (isEnabled) => (
  'ConfirmSection__Label'
  + (isEnabled ? ' ConfirmSection__Label--enabled' : '')
);

const getButtonClassName = (isEnabled) => (
  'ConfirmSection__Button'
  + (isEnabled ? ' ConfirmSection__Button--enabled' : '')
);

const getCheckboxClassName = (isEnabled) => (
  'ConfirmSection__Button__Checkbox'
  + (isEnabled ? ' ConfirmSection__Button__Checkbox--enabled' : '')
);

export default ({ onClick, isEnabled, label }) => (
  <div className="ConfirmSection">
    <div className={getLabelClassName(isEnabled)}>{label}</div>
    <div
      className={getButtonClassName(isEnabled)}
      onClick={isEnabled ? onClick : NOOP}
    >
      <div className={getCheckboxClassName(isEnabled)} />
    </div>
  </div>
);
