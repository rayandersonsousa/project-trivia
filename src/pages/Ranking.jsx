import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import resetScore from '../redux/actions/actionResetScore';

class Ranking extends Component {
  state = {
    rank: [],
  };

  componentDidMount() {
    this.handleRank();
  }

  handleHome = () => {
    const { history, newReset } = this.props;
    newReset(0);
    history.push('/');
  };

  handleRank = () => {
    const { name, score, gravatarEmail } = this.props;
    const token = localStorage.getItem('token');
    const storageRank = JSON.parse(localStorage.getItem('ranking'));
    const latestPlayer = [{ name, score, gravatarEmail, token }];

    if (storageRank !== null) {
      const updateRank = [...storageRank, ...latestPlayer];
      localStorage.setItem('ranking', JSON.stringify(updateRank));
      this.setState({
        rank: updateRank,
      });
    } else {
      localStorage.setItem('ranking', JSON.stringify(latestPlayer));
      this.setState({
        rank: latestPlayer,
      });
    }
  };

  render() {
    const { rank } = this.state;
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking

        </h1>
        {
          rank.sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <div key={ player.token }>
                <img
                  src={ `https://www.gravatar.com/${md5(player.gravatarEmail).toString()}` }
                  alt="Gravatar"
                />
                <p
                  data-testid={ `player-name-${index}` }
                >
                  { player.name }
                </p>
                <p
                  data-testid={ `player-score-${index}` }
                >
                  { player.score }
                </p>
              </div>
            ))
        }
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
  }),
  name: PropTypes.string,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => state.player;

const mapDispatchToProps = (dispatch) => ({
  newReset: (state) => dispatch(resetScore(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
