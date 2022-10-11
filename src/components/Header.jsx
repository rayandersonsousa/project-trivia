import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    imgGravatar: '',
  };

  async componentDidMount() {
    const { email } = this.props;
    const emailHash = md5(email).toString();
    const imgUrl = `https://www.gravatar.com/avatar/${emailHash}`;
    this.setState({
      imgGravatar: imgUrl,
    });
  }

  render() {
    const { name } = this.props;
    const { imgGravatar } = this.state;
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
            { name }
          </h3>
        </div>
        <div>
          <span
            data-testid="header-score"
          >
            0
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.playerReducer.gravatarEmail,
  name: state.playerReducer.name,
});
export default connect(mapStateToProps)(Header);
