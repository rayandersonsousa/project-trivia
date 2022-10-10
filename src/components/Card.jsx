import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { getResult } from '../services/apiResults';
// import getToken from '../services/apiToken';

export default class Card extends Component {
  state = {
    isValidToken: false,
  };

  componentDidMount() {
    const recoveredToken = localStorage.getItem('token');
    if (recoveredToken) {
      localStorage.clear();
      this.setState({ isValidToken: true });
    }
  }

  render() {
    const { isValidToken } = this.state;
    const { history } = this.props;
    return (
      <div>
        {isValidToken
        && history.push('/')}
      </div>
    );
  }
}

Card.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
