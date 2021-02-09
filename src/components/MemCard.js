import React from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import { useSpring, animated as a } from 'react-spring'
import styles from 'styles/MemCard.module.css';

const MemCard = ({ card, onCardClick, animateWin }) => {

    const { id, image, imageId } = card;

    const { transform, opacity } = useSpring({
        opacity: card.flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${ card.flipped ? 180 : 0 }deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
      });

    return (
        <Transition animation='jiggle' duration={500} visible={ animateWin } >
            <Grid.Column  onClick={ () => card.flipped ? null : onCardClick(id, imageId) }>
                <div style={{ width: '100%', paddingTop: '100%', position: 'relative'}}>
                    <a.div 
                        className={ [styles.memCard].join(' ') }
                        style={{
                            backgroundImage: `url(${image})`,
                            opacity, 
                            transform: transform.interpolate(t => `${t} rotateX(180deg)`)
                        }}
                    >
                    <img className={ styles.hidden } src={ image } alt={`url(${image})`} />
                    </a.div>    

                    <a.div 
                        className={ [styles.memCard].join(' ') }
                        style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL}/img/back-1.png)`,
                            opacity: opacity.interpolate(o => 1 - o), 
                            transform
                        }}
                    >
                    </a.div>   
                </div>
            </Grid.Column>  
        </Transition>     
    );
}

export default MemCard;