import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getResults from '../services/apiResults';
import '../App.css';
import { setScore } from '../redux/actions/actionScore';

class Game extends Component {
  state = {
    results: [],
    index: 0,
    hasResults: false,
    answer: [],
    timer: 30,
    btnDisable: false,
    interval: null,
    btnNext: false,
    score: 0,
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
    this.setTimeOut();
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
    console.log(newArray);
  };

  handleClick = (event) => {
    const { getScore } = this.props;
    const score = this.scoreAnwser();
    const one = document.querySelectorAll('.incorrectAnw');
    one.forEach((butt) => {
      const two = butt.getAttribute('data-testid');
      if (two === 'correct-answer') {
        console.log(event.target);
        butt.classList.add('CORRECT_ANSWER');
        getScore(score);
        console.log('chegou no if');
      } else {
        butt.classList.add('INCORRECT_ANSWER');
        // getScore(score);
      }
    });
    this.setState({ btnNext: true });
  };

  scoreAnwser = () => {
    const { index, results, timer } = this.state;
    const EASY_MODE = 1;
    const MEDIUM_MODE = 2;
    const HARD_MODE = 3;
    const DEZ = 10;
    switch (results[index].difficulty) {
    case 'easy':
      return DEZ + (timer * EASY_MODE);
    case 'medium':
      return DEZ + (timer * MEDIUM_MODE);
    case 'hard':
      return DEZ + (timer * HARD_MODE);
    default:
      return 0;
    }
  };

  // https://devtrium.com/posts/set-interval-react

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

  render() {
    const { index, results, hasResults, answer, timer, btnDisable, btnNext } = this.state;
    const { score } = this.props;
    const number = 0.5;
    return (
      <div>
        <Header
          score={ score }
        />
        {hasResults
        && (
          <div>
            <p>{timer}</p>
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
                    disabled={ btnDisable }
                  >
                    {(element.answer)}

                  </button>
                ),
              )}
              <br />
              {btnNext && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.handleNext }
                >
                  Next
                </button>
              )}
            </div>
          </div>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  getScore: (state) => dispatch(setScore(state)),
});

Game.propTypes = {
  getScore: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
