/**
Create a web application that will deal out 5 random cards from a deck of 52 cards. Each card should have an equal chance of being dealt. If there aren't enough cards left in the decks, throw an error. 
*/

/* state 

  previousCards = {
    'Spades': [],
    'Hearts': [],
    "Diamonds": [],
    "Clubs": []
  }

*/

const CARD_SUITS = [
  "Spades",
  "Hearts",
  "Diamonds",
  "Clubs"
];

const CARD_VALUES = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"
];

class CardDealer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousCards: {
        'Spades': [],
        'Hearts': [],
        "Diamonds": [],
        "Clubs": []
      },
      currentCards : [],
      genCount: 0
    }
  }
  
  shouldComponentUpdate (nextProps, nextState) {
    return nextState.genCount !== this.state.genCount
  }
  
  displayCards = () => {
    this.setState((prevState) => {
       return prevState.genCount === 52 ? prevState : this.getNewState(prevState)
    })
  }
  
  getNewState = (prevState) => {
    const cardCount = 5
    const currentCards = []
    let count = 0
    
    const previousCards = {
      'Spades': [...prevState.previousCards['Spades']],
      'Hearts': [...prevState.previousCards['Hearts']],
      "Diamonds": [...prevState.previousCards['Diamonds']],
      "Clubs": [...prevState.previousCards['Clubs']]
    }
    
    while(currentCards.length < cardCount && prevState.genCount + count < 52) {
      let cardSuit = CARD_SUITS[Math.floor(Math.random() * 4)]
      let cardValue = CARD_VALUES[Math.floor(Math.random() * 13)]

      if (previousCards[cardSuit].indexOf(cardValue) === -1) {
        currentCards.push({suit: cardSuit, value: cardValue})
        previousCards[cardSuit].push(cardValue)
        count += 1
      }
    }
    
    return {
      previousCards,
      currentCards,
      genCount : prevState.genCount + count
    }
  }
  
  
  
  render() {  
    return (
      <div>
        <button onClick = {this.displayCards} >Deal a hand</button>
        <div>  
          {this.state.currentCards.map((card, index) => <CardComponent key={index} card={card}/>)}
        </div>  
      </div>  
    )
  }
};

const CardComponent = (props) => {
  const {card} = props
  return (<div className="card">{card.suit + " " + card.value}</div>)
}



ReactDOM.render(
  <CardDealer />, 
  document.querySelector("#root")
);
