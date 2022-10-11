import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getToken from '../services/apiToken';
import logo from '../trivia.png';
import '../App.css';
import { actionEmail } from '../redux/actions/action';

class Login extends Component {
  state = {
    email: '',
    name: '',
    btnDisable: true,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    const { token } = await getToken();
    localStorage.setItem('token', token);
    if (token.length) {
      dispatch(actionEmail(email, name));
      history.push('/game');
    }
  };

  validateTriviaForm = () => {
    const { email, name } = this.state;
    const verify = /\S+@\S+\.\S+/;
    if (name.length > 0 && verify.test(email)) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => { this.validateTriviaForm(); });
  };

  redirectSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { btnDisable } = this.state;
    return (
      <div className="App App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <br />
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="email">
            E-mail
            <input
              id="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              name="email"
            />
          </label>
          <br />
          <label htmlFor="name">
            Name
            <input
              id="name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              name="name"
            />
          </label>
          <div>
            <button
              data-testid="btn-play"
              type="submit"
              disabled={ btnDisable }
            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              type="button"
              onClick={ this.redirectSettings }
            >
              Settings
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   dispatch,
// });

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
