url = 'http://numbersapi.com/8?json';

async function fact() {
	let fact = await axios.get(url);
	console.log(fact);
}

async function mult_nums() {
	let nums = await axios.get('http://numbersapi.com/8,9,10,11');
	console.log(nums);
}

let ul = document.querySelector('#cardList');

async function mult_facts() {
	let facts = await Promise.all(Array.from({ length: 4 }, () => axios.get(url)));
	console.log(facts);
	facts.forEach((fact) => {
		let li = document.createElement('li');
		li.innerHTML = fact.data.text;
		ul.append(li);
	});
}

async function draw_card() {
	let card = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1');
	console.log(card);
}

let card1 = null;

async function draw2() {
	let deck = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1');

	let deck_id = deck.data.deck_id;
	card1 = deck.data.cards[0];
	let redraw = await axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
	let card2 = redraw.data.cards[0];
	console.log(card1, card2);
}
const button = document.getElementById('button');
async function full_deck() {
	let deck = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

	button.addEventListener('click', async function callfunc() {
		let res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`);
		if (res.data.cards && res.data.cards[0] && res.data.cards[0].value) {
			const li = document.createElement('li');
			li.innerHTML = `${res.data.cards[0].value} of ${res.data.cards[0].suit}`;
			ul.append(li);
		} else {
			button.removeEventListener('click', callfunc());
		}
	});
}
