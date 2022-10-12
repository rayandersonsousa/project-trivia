import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { disableBtn, resetTimer, getRemaining } from '../redux/actions/actionTime';

class Header extends Component {
  state = {
    imgGravatar: '',
    countDown: 30,
    interval: null,
  };

  async componentDidMount() {
    const { email } = this.props;
    const emailHash = md5(email).toString();
    const imgUrl = `https://www.gravatar.com/avatar/${emailHash}`;
    this.setState({
      imgGravatar: imgUrl,
    });
    this.setTimeOut();
  }

  componentDidUpdate() {
    const { disableOptions, resetTime, restartTimer, remainTimer } = this.props;
    const { countDown } = this.state;
    if (countDown === 0) {
      disableOptions(true);
    }
    if (resetTime === true) {
      remainTimer(countDown);
      this.setState({
        countDown: 30,
      });
      restartTimer(false);
    }
  }

  functionInterval = (click) => {
    const { interval, countDown } = this.state;
    // const { timer } = this.props;
    if (countDown > 0 && click === undefined) {
      return this.setState((pervState) => ({
        countDown: pervState.countDown - 1,
      }));
    }
    clearInterval(interval);
    // this.setState({ btnDisable: true });
  };

  setTimeOut = () => {
    const miliSec = 1000;
    const interval = setInterval(() => {
      this.setState({ interval });
      this.functionInterval();
    }, miliSec);
  };

  render() {
    const { name, score } = this.props;
    const { imgGravatar, countDown } = this.state;
    return (
      <header>
        <div>
          <img
            src={ imgGravatar }
            alt=""
            data-testid="header-profile-picture"
          />
        </div>
        <div>
          <h3
            data-testid="header-player-name"
          >
            {name}
          </h3>
        </div>
        <div>
          <span
            data-testid="header-score"
          >
            {score}
          </span>
          <p>{countDown}</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  resetTime: state.timer.resetTimer,
});

const mapDispatchToProps = (dispatch) => ({
  disableOptions: (state) => dispatch(disableBtn(state)),
  restartTimer: (state) => dispatch(resetTimer(state)),
  remainTimer: (state) => dispatch(getRemaining(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
