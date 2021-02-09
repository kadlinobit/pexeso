import React, { useState } from 'react';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { initPlayersSelection, initSizeSelection } from 'helpers';

const renderPlayerNameInputs = ( playerCountInput, playerNameInputs, setPlayerNameInputs ) => {
    const playerNameInputsArray = [];
    
    for (let i = 0; i < playerCountInput; i++) {
        playerNameInputsArray.push(
            <Form.Input
                key={ i } 
                value={ playerNameInputs[i] }
                onChange={ (e, data) => setPlayerNameInputs( prevInputs => prevInputs.map((name, index) => index === i ? data.value : name )) }
                fluid
                placeholder={ `Player ${i+1} Name` }
            />
        )
    }

    return playerNameInputsArray;
}

const StartGame = ({ onGameStart }) => {

    const [playerCountInput, setPlayerCountInput] = useState(null);
    const [sizeInput, setSizeInput] = useState(null);
    const [playerNameInputs, setPlayerNameInputs] = useState(['','','','']);

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                <Icon name="table" color="teal" /> PEXESO - Memory Card Game
            </Header>
            <Form size='large'>
                <Segment stacked>
                    <Form.Dropdown
                        value={ playerCountInput }
                        onChange={ (e, data) => setPlayerCountInput(data.value) }
                        fluid
                        selection
                        placeholder="Number of Players"
                        options={ initPlayersSelection() }   
                    />
                    {
                        renderPlayerNameInputs( playerCountInput, playerNameInputs, setPlayerNameInputs )
                    }
                    <Form.Dropdown 
                        value={ sizeInput }
                        onChange={ (e, data) => setSizeInput(data.value) }
                        fluid
                        selection
                        placeholder="Game Size"
                        options={ initSizeSelection() }   
                    />  
                    <Button 
                        onClick={ () => onGameStart(playerCountInput, sizeInput, playerNameInputs) }
                        disabled={ !playerCountInput || !sizeInput }
                        color='teal' 
                        fluid size='large'
                    >
                        Start Game
                    </Button>
                </Segment>
            </Form>
            <Message>
                All the cards images designed by <a href="http://www.freepik.com">pch.vector / Freepik</a>
            </Message>
            </Grid.Column>
        </Grid>
    )
};

export default StartGame;