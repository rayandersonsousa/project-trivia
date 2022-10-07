import React, { Component } from 'react';
import logo from '../trivia.png';
import '../App.css';

export default class Login extends Component {
  state = {
    email: '',
    name: '',
    btnDisable: true,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('bora jogar danado');
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
              type="text"
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
              // value={ name }
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
          </div>
        </form>
      </div>
    );
  }
}
