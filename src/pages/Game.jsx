import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getResults from '../services/apiResults';

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
    console.log(arrayQuestiion);
    const expiredToken = 3;
    if (arrayQuestiion.response_code === expiredToken) {
      console.log('chegou aqui');
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
      // console.log(newArray[0].sort(() => number - Math.random()));
    this.setState({
      answer: newArray,
    });
    console.log(newArray);
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
