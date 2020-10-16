import React, { useState } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AddCardForm } from './containers/AddCardForm';
import { CardListPage } from './containers/CardListPage';
import { GoBackButton } from './components/GoBackButton';

const SHOW_ADD_FORM = 'ADD';
const SHOW_LIST = 'LIST';

function App() {
  const [showing, setShowing] = useState(SHOW_LIST);

  return (
    <div className="App">
      <CssBaseline />
      <main className="App-main">
        {showing !== SHOW_LIST ? <GoBackButton onClick={() => setShowing(SHOW_LIST)} /> : undefined}
        {showing === SHOW_ADD_FORM ? <AddCardForm onFormSubmitFinished={() => setShowing(SHOW_LIST)} /> : undefined}
        {showing === SHOW_LIST ? <CardListPage onAddCardButtonClick={() => setShowing(SHOW_ADD_FORM)} /> : undefined}
      </main>
    </div>
  );
}

export default App;
