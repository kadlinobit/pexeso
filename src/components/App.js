import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';

import StartGame from 'components/StartGame';
import EndGame from 'components/EndGame';
import Game from 'components/Game';

const renderApp = (gamePhase) => {
    switch(gamePhase) {
        case 0: 
            return <StartGame />
        case 1: 
            return <Game />
        case 2:
            return <EndGame />
        default:
            <StartGame />
    }
}

const App = () => {

    const [gamePhase, setGamePhase] = useState(1);

    return renderApp(gamePhase);
}

export default App;