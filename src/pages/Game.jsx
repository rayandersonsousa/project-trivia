import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getResults from '../services/apiResults';
import '../App.css';

export default class Game extends Component {
  state = {
    results: [],
    index: 0,
    hasResults: false,
    answer: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const recoveredToken = localStorage.getItem('token');
    const arrayQuestiion = await getResults(recoveredToken);
    const expiredToken = 3;
    if (arrayQuestiion.response_code === expiredToken) {
      localStorage.clear();
      history.push('/');
    } this.setState({ results: arrayQuestiion.results, hasResults: true });
    this.settingAnwser(arrayQuestiion.results);
  }

  settingAnwser = async (results) => {
    const newArray = results.map((item) => [...item.incorrect_answers
      .map((incorrect, index) => ({
        answer: incorrect,
        id: `wrong-answer-${index}`,
      })), { answer: item.correct_answer, id: 'correct-answer' }]);
    this.setState({
      answer: newArray,
    });
  };

  handleClick = () => {
    const one = document.querySelectorAll('.incorrectAnw');
    one.forEach((butt) => {
      const two = butt.getAttribute('data-testid');
      if (two === 'correct-answer') {
        butt.classList.add('CORRECT_ANSWER');
      } else {
        butt.classList.add('INCORRECT_ANSWER');
      }
    });
  };

  render() {
    const { index, results, hasResults, answer } = this.state;
    const number = 0.5;
    return (
      <div>
        <Header />
        {hasResults
        && (
          <div>
            <h3
              data-testid="question-category"
            >
              {results[index].category}

            </h3>
            <p
              data-testid="question-text"
            >
              {results[index].question}

            </p>
            <div
              data-testid="answer-options"
            >
              {answer[index].sort(() => number - Math.random()).map(
                (element, incorrect) => (
                  <button
                    type="button"
                    key={ incorrect }
                    data-testid={ element.id }
                    className="incorrectAnw"
                    onClick={ this.handleClick }
                  >
                    {(element.answer)}

                  </button>
                ),
              )}
            </div>
          </div>)}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
