/* 
Please, copy this code on your website to accredit the author:
<a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
*/

import React, { useState, useEffect } from 'react';

import { Card, Container, Grid, Segment, Divider } from 'semantic-ui-react';

import { initDeck, initScoreBoard } from 'helpers';
import useWindowDimensions from 'hooks/useWindowDimensions';
import MemCard from 'components/MemCard';

const Game = ({ playerCount, size }) => {
    const [scoreBoard, setScoreBoard] = useState(() => initScoreBoard(playerCount));
    const [flippedCount, setFlippedCount] = useState(() => initScoreBoard(playerCount));
    const [player, setPlayer] = useState(0);
    const [deck, setDeck] = useState(() => initDeck(size));
    const [flippedImages, setFlippedImages] = useState([]);
    const [animateWin, setAnimateWin] = useState(true);

    // Tools for calculating container width
    const { width, height } = useWindowDimensions();
    const [containerWidth, setContainerWidth] = useState(height);
    
    // Card click handler - flip card
    const onCardClick = (id, imageId) => {
        if(flippedImages.length !== 2) {
            const newState = deck.map(card => {
                return card.id === id ? {...card, flipped: true} : card;
            });
            setDeck(newState);
            setFlippedImages([...flippedImages, imageId]);
            setFlippedCount( prevFlippedCount => prevFlippedCount.map((count, i) => i === player ? count + 1 : count)); 
        } 
    }
    
    // Set container width according to screen height
    useEffect(() => {
        const ratio = size[0] / size[1];
        let maxWidth = Math.floor(ratio*height - (ratio * 200));
        setContainerWidth(maxWidth);
    }, [width, height, size]);

    // Main useEffect for controlling the game mechanism.
    useEffect(() => {    
        if (flippedImages.length === 2) {
            
            setTimeout(() => {
                setFlippedImages([]);

                //CASE #1 - Flipped cards do not match - flip cards with given image back and switch player.
                if (flippedImages[0] !== flippedImages[1]) {
                    setDeck(prevDeck => {
                        return prevDeck.map(card => {
                            return flippedImages.includes(card.imageId) ? {...card, flipped: false} : card;
                        });
                    });       
                    setPlayer(prevPlayer => prevPlayer < (playerCount - 1) ? prevPlayer + 1 : 0);                       
                }  
                // CASE #2 - Flipped cards match - increase current player score, do not flip cards back and do not switch player. 
                else {
                    setScoreBoard( prevScoreBoard => prevScoreBoard.map((score, i) => i === player ? score + 1 : score)); 
                }                          
            }, 1500);    
            
        }
    }, [flippedImages, playerCount, player]);

    useEffect(() => {
        if (flippedImages.length === 2 && flippedImages[0] === flippedImages[1]) {
            setAnimateWin(prevAnimateWin => !prevAnimateWin);
        }

    },[flippedImages])

    return (    
        <>
            <Segment inverted>
                <Container>
                    <Grid columns={ playerCount }>
                    {
                        scoreBoard.map((score, i) => {
                            return (
                                <Grid.Column>
                                    <Segment inverted={ player === i } color={ player === i ? 'green' : 'red'}>
                                        <h3>{`Player ${i+1}`}</h3>
                                        <div>{`Score: ${score}`}</div>
                                        <div>{`Flipped cards: ${flippedCount[i]}`}</div>
                                    </Segment>
                                </Grid.Column>
                            );
                        })
                    }
                    </Grid>
                </Container>
            </Segment>
            <Divider hidden />
            <Container style={{ width: `${containerWidth}px` }}>
                    <Card.Group itemsPerRow={ size[0] }>
                        {
                            deck.map(card => {
                                return (
                                    <MemCard key={ card.id } card={ card } onCardClick={ onCardClick } animateWin={ animateWin } />
                                )
                            })
                        }
                    </Card.Group>
            </Container>
        </>
    );
}

Game.defaultProps = {
    playerCount: 2, 
    size: [4,3]
}

export default Game;