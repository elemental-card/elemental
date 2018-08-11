import React from 'react';
import InitialChoosingScreen from '../containers/InitialChoosingScreen';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      tentativeInitials: '',
    };
  }

  render() {
    return (
      <InitialChoosingScreen
        tentativeInitials={this.state.tentativeInitials}
        onEditTentativeInitials={(tentativeInitials) => this.setState({ tentativeInitials })}
        onConfirmTentativeInitials={() => alert('Confirmed ' + this.state.tentativeInitials)}
        onBack={() => alert('Back.')}
      />
    );
  }
};
