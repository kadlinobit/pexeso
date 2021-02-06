import React from 'react';
//import { useSpring, animated as a } from "react-spring";
import { Card, Transition, Image } from 'semantic-ui-react';

const MemCard = ({ card, onCardClick, animateWin }) => {

    const { id, image, imageId } = card;

    return (
        <Transition animation='jiggle' duration={500} visible={ animateWin } >
            <Card>
            {/*<Transition.Group animation='horizontal flip' duration={ 200 }>*/}

                { card.flipped && (       
                            <Image style={{ width: '100%'}} src={ image } />      
                )}
                { !card.flipped && (               
                            <Image onClick={ () => onCardClick(id, imageId) } style={{ width: '100%'}} src={`${process.env.PUBLIC_URL}/img/back-1.png`} />                              
                )} 
            
            {/*</Transition.Group>*/}
            </Card>  
        </Transition>     
    );
}

export default MemCard;