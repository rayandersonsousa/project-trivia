import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getResults from '../services/apiResults';
import '../App.css';
import { setScore } from '../redux/actions/actionScore';
import { resetTimer } from '../redux/actions/actionTime';

class Game extends Component {
  state = {
    results: [],
    index: 0,
    hasResults: false,
    answer: [],
    // timer: 30,
    // btnDisable: false,
    // interval: null,
    btnNext: false,
    CORRECT_ANSWER: 'correct-answer',
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
    // this.setTimeOut();
  }

  settingAnwser = async (results) => {
    const { CORRECT_ANSWER } = this.state;
    const newArray = results.map((item) => [...item.incorrect_answers
      .map((incorrect, index) => ({
        answer: incorrect,
        id: `wrong-answer-${index}`,
      })), { answer: item.correct_answer, id: CORRECT_ANSWER }]);
    this.setState({
      answer: newArray,
    });
  };

  handleClick = (element) => {
    const { CORRECT_ANSWER } = this.state;
    const { getScore } = this.props;
    const btnsOptions = document.querySelectorAll('.incorrectAnw');
    btnsOptions.forEach((item) => {
      const btnData = item.getAttribute('data-testid');
      console.log(btnData);
      if (btnData === CORRECT_ANSWER) {
        item.classList.add('CORRECT_ANSWER');
      } else {
        item.classList.add('INCORRECT_ANSWER');
      }
    });
    let assertions = 0;
    if (element.id === CORRECT_ANSWER) {
      const score = this.scoreAnwser();
      console.log('acertou');
      assertions += 1;
      const scoreAndAssertions = {
        score,
        assertions,
      };
      getScore(scoreAndAssertions);
    } else {
      console.log('errou');
    }
    this.setState({ btnNext: true });
  };

  scoreAnwser = () => {
    const { index, results } = this.state;
    const { timeLeft } = this.props;
    const EASY_MODE = 1;
    const MEDIUM_MODE = 2;
    const HARD_MODE = 3;
    const DEZ = 10;
    switch (results[index].difficulty) {
    case 'easy':
      return DEZ + (timeLeft * EASY_MODE);
    case 'medium':
      return DEZ + (timeLeft * MEDIUM_MODE);
    case 'hard':
      return DEZ + (timeLeft * HARD_MODE);
    default:
      return 0;
    }
  };

  // https://devtrium.com/posts/set-interval-react

  // functionInterval = (click) => {
  //   const { timer, interval } = this.state;
  //   if (timer > 0 && click === undefined) {
  //     return this.setState((prevState) => ({
  //       timer: prevState.timer - 1,
  //     }));
  //   }
  //   clearInterval(interval);
  //   this.setState({ btnDisable: true });
  // };

  // setTimeOut = () => {
  //   const miliSec = 1000;
  //   const interval = setInterval(() => {
  //     this.setState({ interval });
  //     this.functionInterval();
  //   }, miliSec);
  // };

  handleNext = () => {
    const { index } = this.state;
    const { reset, history } = this.props;
    const maxIndex = 4;
    const btnsOptions = document.querySelectorAll('.incorrectAnw');
    btnsOptions.forEach((item) => item.classList.remove(
      'CORRECT_ANSWER',
      'INCORRECT_ANSWER',
    ));
    this.setState({
      index: index + 1,
    });
    reset(true);
    if (index === maxIndex) {
      console.log(index);
      history.push('/feedback');
    }
  };

  render() {
    const { index, results, hasResults, answer, btnNext } = this.state;
    const { isDisabled } = this.props;
    const number = 0.5;
    return (
      <div>
        <Header />
        {hasResults
        && (
          <div>
            {/* <p>{timer}</p> */}
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
              {answer[index].map(
                (element, incorrect) => (
                  <button
                    type="button"
                    key={ incorrect }
                    data-testid={ element.id }
                    className="incorrectAnw"
                    onClick={ () => this.handleClick(element) }
                    disabled={ isDisabled }
                  >
                    {(element.answer)}

                  </button>
                ),
              ).sort(() => number - Math.random())}
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
  isDisabled: state.timer.btnDisabled,
  timeLeft: state.timer.remainingTimer,
});

const mapDispatchToProps = (dispatch) => ({
  getScore: (state) => dispatch(setScore(state)),
  reset: (state) => dispatch(resetTimer(state)),
});

Game.propTypes = {
  getScore: PropTypes.func,
  disable: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  isDisabled: PropTypes.bool,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Game);
