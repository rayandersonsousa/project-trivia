import React from 'react';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
 
describe('Test the feedback page', () => {
  test('if the message "could be better on the page', () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    act(() => {
      history.push('feedback')
    })
    const msgFeedback = screen.getByTestId('feedback-text')
    expect(msgFeedback).toBeInTheDocument();
  });
  test('if there is a button named play again', () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    act(() => {
      history.push('feedback')
    })
    const playBtn = screen.getByTestId('btn-play-again')
    expect(playBtn).toBeInTheDocument();
  });
  test('if there is a button named Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    act(() => {
      history.push('feedback')
    })
    const rankingBtn = screen.getByTestId('btn-ranking')
    expect(rankingBtn).toBeInTheDocument();
  });
  test('if the photo of the gravatar user appears', () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    act(() => {
      history.push('feedback')
    })
   const imgGravatar = screen.getByTestId('header-profile-picture')
   expect(imgGravatar).toBeInTheDocument();
  });
  test('if redirects to login page when click play again', () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    act(() => {
      history.push('feedback')
    })
    const playBtn = screen.getByTestId('btn-play-again')
    userEvent.click(playBtn)
    expect(history.location.pathname).toBe('/');
  });
  test('if redirects to login page when clicking on Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    act(() => {
      history.push('feedback')
    })
    const rankingBtn = screen.getByTestId('btn-ranking')
    userEvent.click(rankingBtn)
    expect(history.location.pathname).toBe('/ranking');
  });
});
