import React from 'react';
import  { Grid, Header, Divider, Segment, Form } from 'semantic-ui-react';
import ScoreBoard from 'components/ScoreBoard'

const EndGame = ({ lastGameResults, onGameRestart, onNewGame }) => {

    lastGameResults.sort((a,b) => {
        return ((b.score - a.score) || (a.flippedCount - b.flippedCount));
    });

    return (

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    {`${lastGameResults[0].playerName} wins!`}
                </Header>
                <Segment stacked>
                    <ScoreBoard 
                        columns={ 1 }
                        playerCount={ lastGameResults.length } 
                        playerNames={ lastGameResults.map( result => result.playerName ) }
                        scoreBoard={ lastGameResults.map( result => result.score ) }
                        flippedCount={ lastGameResults.map( result => result.flippedCount ) } 
                        player={ 0 } 
                    />
                    <Divider />
                    <Form>
                        <Form.Button 
                            onClick={ () => onGameRestart() }
                            color='black' 
                            fluid size='large'
                        >
                            Restart Game
                        </Form.Button>
                        
                        <Form.Button 
                            onClick={ () => onNewGame() }
                            color='blue' 
                            fluid size='large'
                        >
                            Start New Game
                        </Form.Button>
                    </Form>

                </Segment>
            </Grid.Column>
        </Grid>


    )
};

export default EndGame;