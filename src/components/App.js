import React, { useState } from 'react';

import StartGame from 'components/StartGame';
import EndGame from 'components/EndGame';
import Game from 'components/Game';


const App = () => {

    const [playerCount, setPlayerCount] = useState(null);
    const [playerNames, setPlayerNames] = useState(null);
    const [size, setSize] = useState(null);
    const [gamePhase, setGamePhase] = useState(0);
    const [lastGameResult, setLastGameResults] = useState(null);

    const onGameStart = (playerCountInput, sizeInput, playerNameInputs) => {
        
        setPlayerCount(playerCountInput);
        setSize(sizeInput);

        const playerNamesFilter = [];
        for (let i = 0; i < playerCountInput; i++) {
            playerNamesFilter.push(playerNameInputs[i] !== '' ? playerNameInputs[i] : `Player ${i+1}`);
        }
        setPlayerNames(playerNamesFilter);

        setGamePhase(1);
    }

    const onGameEnd = (scoreBoard, flippedCount) => {
        
        const lastGameResults = scoreBoard.map((score, index) => {
            return {
                id: index,
                playerName: playerNames[index],
                score: score,
                flippedCount: flippedCount[index]
            }
        });
        
        setLastGameResults(lastGameResults);     
        setGamePhase(2);
    }

    const onGameRestart = () => {
        setGamePhase(1);
    }

    const onNewGame = () => {
        setGamePhase(0);
    }

    switch(gamePhase) {
        case 0: 
            return <StartGame onGameStart={ onGameStart } />
        case 1: 
            return <Game playerCount={ playerCount } playerNames={ playerNames } size={ JSON.parse(size) } onGameEnd={ onGameEnd } />
        case 2:
            return <EndGame lastGameResults={ lastGameResult } onGameRestart={ onGameRestart } onNewGame={ onNewGame } />
        default:
            <StartGame onGameStart={ onGameStart } />
    }
}

export default App;