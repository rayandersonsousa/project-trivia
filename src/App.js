import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameScreen from './pages/GameScreen';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ GameScreen } />
    </Switch>
  );
}
