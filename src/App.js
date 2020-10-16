import React, { useState } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AddCardButton } from './components/AddCardButton';
import { AddCardForm } from './containers/AddCardForm';

const SHOW_ADD_FORM = 'ADD';
const SHOW_LIST = 'LIST';

function App() {
  const [showing, setShowing] = useState(SHOW_LIST);

  return (
    <div className="App">
      <CssBaseline />
      <main className="App-main">
        {showing === SHOW_ADD_FORM ? <AddCardForm onFormSubmitFinished={() => setShowing(SHOW_LIST)} /> : undefined}
        {showing === SHOW_LIST ? <AddCardButton onClick={() => setShowing(SHOW_ADD_FORM)} /> : undefined}
      </main>
    </div>
  );
}

export default App;
