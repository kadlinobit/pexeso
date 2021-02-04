/* 
Please, copy this code on your website to accredit the author:
<a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
*/

import React, { useState, useEffect } from 'react';

import { Card, Container, Rail, Segment } from 'semantic-ui-react';

import useWindowDimensions from 'hooks/useWindowDimensions';
import MemCard from 'components/MemCard';



const images = [];

for (let i=1; i<13; i++) {
    images.push(`${process.env.PUBLIC_URL}/img/animal-${i}.png`);
}

const initScoreBoard = (playerCount) => {
    const scoreBoard = [];
    
    for (let i=0; i<playerCount; i++) { scoreBoard.push(0); }
    return(scoreBoard);
}

const initDeck = (size) => {
    const newGame = []
    
    for (let i = 0; i < size / 2; i++) {
      const firstOption = {
        id: 2 * i,
        imageId: i,
        image: images[i],
        flipped: false,
      }
      const secondOption = {
        id: 2 * i + 1,
        imageId: i,
        image: images[i],
        flipped: false,
      }

      newGame.push(firstOption)
      newGame.push(secondOption)
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5);
    return shuffledGame;

}


const Game = ({ playerCount, size }) => {
    const [scoreBoard, setScoreBoard] = useState(() => initScoreBoard(playerCount));
    const [player, setPlayer] = useState(0);
    const [deck, setDeck] = useState(() => initDeck(size));
    const [flippedImages, setFlippedImages] = useState([]);
    const [flippedCount, setFlippedCount] = useState(() => initScoreBoard(playerCount));

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
        } 
        setFlippedCount( prevFlippedCount => prevFlippedCount.map((count, i) => i === player ? count + 1 : count)); 
    }
    
    // Set container width according to screen height
    useEffect(() => {
        setContainerWidth(height - 70);
    }, [width, height]);

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
            }, 2000);    
            
        }
    }, [flippedImages, playerCount, player]);

    return (    
        <Container style={{ width: `${containerWidth}px` }}>
            <Segment>
                <Rail close="very" position={ width > height ? 'left' : 'bottom'}>
                {
                    scoreBoard.map((score, i) => {
                        return (
                            <Segment inverted={ player === i } color={ player === i ? 'green' : 'grey'}>
                                <h3>{`Player ${i+1}`}</h3>
                                <div>{`Score: ${score}`}</div>
                                <div>{`Flipped cards: ${flippedCount[i]}`}</div>
                            </Segment>
                        );
                    })
                }
                </Rail>
                <Card.Group itemsPerRow={4}>
                    {
                        deck.map(card => {
                            return (
                                <MemCard key={ card.id } card={ card } onCardClick={ onCardClick } />
                            )
                        })
                    }
                </Card.Group>
            </Segment>
        </Container>
       
    );
}

Game.defaultProps = {
    playerCount: 3, 
    size: 16
}

export default Game;