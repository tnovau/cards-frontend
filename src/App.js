import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AddCardForm } from './containers/AddCardForm';
import { EditCardForm } from './containers/EditCardForm';
import { CardListPage } from './containers/CardListPage';
import { GoBackButton } from './components/GoBackButton';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <main className="App-main">
        <GoBackButton  />
        <Switch>
          <Route path="/edit/:id" exact>
            <EditCardForm />
          </Route>
          <Route path="/add" exact>
            <AddCardForm />
          </Route>
          <Route path="/" exact>
            <CardListPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
