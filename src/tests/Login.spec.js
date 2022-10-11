import React from 'react';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event'

describe('Tests information present in trivia game login page', () => {
  test('if the page has the email input', () => {
   renderWithRouterAndRedux(<App/>)   
    const emailInput = screen.getByRole('textbox', {
      name: /e\-mail/i
    })
    expect(emailInput).toBeInTheDocument();
  });
  test('if the page has the name input', () => {
    renderWithRouterAndRedux(<App/>)   
    const nameInput = screen.getByRole('textbox', {
      name: /name/i
    })
    expect(nameInput).toBeInTheDocument();
  });
  test('if the page has a play button', () => {
    renderWithRouterAndRedux(<App/>)   
    const playButton = screen.getByRole('button', {
      name: /play/i
    })
    expect(playButton).toBeInTheDocument();
  });
  test('if the page has a settings button', () => {
    renderWithRouterAndRedux(<App/>)   
    const settingsButton = screen.getByRole('button', {
      name: /settings/i
    })
    expect(settingsButton).toBeInTheDocument();
  });
  test('if when filling only the email, the button is disabled', () => {
    renderWithRouterAndRedux(<App/>)   
    const emailInput = screen.getByRole('textbox', {
      name: /e\-mail/i
    })
    userEvent.type(emailInput, 'test@test.com')
    const playButton = screen.getByRole('button', {
      name: /play/i
    })
    expect(playButton).toBeDisabled();
  });
  test('if when filling only the name, the button is disabled', () => {
    renderWithRouterAndRedux(<App/>)   
    const nameInput = screen.getByRole('textbox', {
      name: /name/i
    })
    userEvent.type(nameInput, 'joão')
    const playButton = screen.getByRole('button', {
      name: /play/i
    })
    expect(playButton).toBeDisabled();
  });
  test('if on clicking the play button it redirects to the game page', async () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    const emailInput =  screen.getByLabelText(/e\-mail/i);
    userEvent.type(emailInput, 'jvitorrrr@gmail.com');
    const nameInput = screen.getByLabelText(/name/i);
    userEvent.type(nameInput, 'João Andrade');
    const btnPlay = screen.getByRole('button', { name: /play/i });
    userEvent.click(btnPlay);
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/game');
    });
  });
  
  test('if on clicking the settings button it redirects to the settings page', () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    const settingsButton = screen.getByRole('button', {
      name: /settings/i
    })
    userEvent.click(settingsButton);
    const { location: { pathname } } = history;   
    
    expect(pathname).toBe('/settings');
  });
});
