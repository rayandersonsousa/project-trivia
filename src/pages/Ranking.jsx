import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Ranking extends Component {
  handleHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking

        </h1>
        <button
          type="button"
          onClick={ this.handleHome }
          data-testid="btn-go-home"
        >
          Home

        </button>

      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
