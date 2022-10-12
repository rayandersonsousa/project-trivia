import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    imgGravatar: '',
    timer: 30,
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

  functionInterval = (click) => {
    const { timer, interval } = this.state;
    if (timer > 0 && click === undefined) {
      return this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }
    clearInterval(interval);
    this.setState({ btnDisable: true });
  };

  setTimeOut = () => {
    const miliSec = 1000;
    const interval = setInterval(() => {
      this.setState({ interval });
      this.functionInterval();
    }, miliSec);
  };

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) {
      
    }
  }

  render() {
    const { name, score } = this.props;
    const { imgGravatar, timer } = this.state;
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
          <p>{timer}</p>
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
});
export default connect(mapStateToProps)(Header);
