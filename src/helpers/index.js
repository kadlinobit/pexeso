/**
* Returns array of selection objects for "Number of players" dropdown.
* @returns {Array.<Object>} players - array of selection objects for a dropdown.
*/
export const initPlayersSelection = () => {
  return [1,2,3,4].map( num => {
    var label = num > 1 ? 'Players' : 'Player';
    return {
      key: num,
      text: num + ' ' + label,
      value: num
    };
  });
}

/**
* Returns array of selection objects for "Game Size" dropdown.
* @returns {Array.<String>} sizes - array of stringified arrays.
*/
export const initSizeSelection = () => {
  return [[3,2],[4,3],[4,4],[5,4],[6,4]].map((size, index) => {
    return {
      key: index,
      text: size[0] + 'x' + size[1] + ' Cards',
      value: JSON.stringify(size)
    };
  })
}

/**
* Returns shuffled array of images for memory cards.
* @returns {Array.<String>} images - array of image URLs.
*/
export const initImages = () => {
    const images = [];
    
    for (let i=1; i<13; i++) {
        const image = `${process.env.PUBLIC_URL}/img/animal-${i}.png`
        images.push(image);
    }

    return images.sort(() => Math.random() - 0.5);
}

/**
* Returns shuffled array of images for memory cards.
* @param {Array} size - array of 2 numbers defining the dimensions of the game deck (e.g. [4,3] => 4x3 cards).
* @returns {Array.<Object>} shuffledGame - array of card objects.
*/
export const initDeck = (size) => {
    const newGame = []
    const images = initImages(); 

    for (let i = 0; i < (size[0] * size[1]) / 2; i++) {
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

/**
* Returns empty scoreboard - array of integers with number of items based on player count.
* @param {Number} playerCount - number of players (integer).
* @returns {Array.<Number>} array of length given by number of players, each item equal to 0.
*/
export const initScoreBoard = (playerCount) => {
    const scoreBoard = [];
    
    for (let i=0; i<playerCount; i++) { scoreBoard.push(0); }
    return(scoreBoard);
}