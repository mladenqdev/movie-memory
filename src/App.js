import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
	{ src: '/img/matrix.jpg' },
	{ src: '/img/25th-hour.jpg' },
	{ src: '/img/dragon-tattoo.jpg' },
	{ src: '/img/fight-club.jpg' },
	{ src: '/img/in-bruges.jpg' },
	{ src: '/img/lord-of-the-rings.jpg' },
];

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);

	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);

	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		setCards(shuffledCards);
		setTurns(0);
	};

	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			if (choiceOne.src === choiceTwo.src) {
				console.log('match');
				resetTurn();
			} else {
				console.log('dont match');
				resetTurn();
			}
		}
	}, [choiceOne, choiceTwo]);

	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
	};

	return (
		<div className="App">
			<h1>Movie Memory</h1>
			<button onClick={shuffleCards}>New Game</button>

			<div className="card-grid">
				{cards.map((card) => (
					<SingleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
