import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

const ScoreBoard = ({ columns, playerCount, playerNames, flippedCount, scoreBoard, player }) => {
    return (
        <Grid columns={ columns }>
        {
            scoreBoard.map((score, i) => {
                return (
                    <Grid.Column key={ i }>
                        <Segment inverted={ player === i } color={ player === i ? 'teal' : 'grey'}>
                            <h3>{ playerNames[i] }</h3>
                            <div className='bold'>{`Score: ${score}`}</div>
                            <div>{`Flipped cards: ${flippedCount[i]}`}</div>
                        </Segment>
                    </Grid.Column>
                );
            })
        }
        </Grid>
    );
}

export default ScoreBoard;