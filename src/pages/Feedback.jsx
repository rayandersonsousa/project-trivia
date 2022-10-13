import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import resetScore from '../redux/actions/actionResetScore';

class Feedback extends Component {
  state = {
    urlGravatar: '',
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    const urlGravatarAndToken = `https://www.gravatar.com/avatar/${token}`;
    this.setState({ urlGravatar: urlGravatarAndToken });
  }

  handlePlayAgain = () => {
    const { history, newReset } = this.props;
    newReset(0);
    history.push('/');
  };

  render() {
    const { name, score, assertions } = this.props;
    const { urlGravatar } = this.state;
    const assertionsNumber = 3;
    return (
      <div>
        <header>
          <img src={ urlGravatar } alt="foto" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{name}</p>
          <span data-testid="header-score">{score}</span>
        </header>
        <h1 data-testid="feedback-text">
          {assertions >= assertionsNumber ? 'Well Done!' : 'Could be better...'}
        </h1>
        <div>
          <p
            data-testid="feedback-total-score"
          >
            {score}
          </p>
          <p
            data-testid="feedback-total-question"
          >
            {assertions}
          </p>
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgain }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string,
  score: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  newReset: (state) => dispatch(resetScore(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
