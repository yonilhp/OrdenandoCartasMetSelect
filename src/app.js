document.getElementById("drawBtn").addEventListener("click", drawCards);
document.getElementById("sortBtn").addEventListener("click", sortCards);

let cards = [];
let originalCards = [];
let log = [];
let currentIteration = 0;

function drawCards() {
  const cardCount = parseInt(document.getElementById("cardCount").value) || 0;
  cards = generateRandomCards(cardCount);
  originalCards = [...cards];
  displayCards(cards);
  log = [];
  currentIteration = 0;
  document.getElementById("logContainer").innerHTML = "";
}

function generateRandomCards(count) {
  const suits = ["spade", "club", "heart", "diamond"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A"
  ];
  return Array.from({ length: count }, () => {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    return { suit: randomSuit, value: randomValue };
  });
}

function displayCards(cards) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";
  cards.forEach(card => {
    const cardElement = createCardElement(card);
    cardsContainer.appendChild(cardElement);
  });
}

function createCardElement({ suit, value }) {
  const card = document.createElement("div");
  card.className = `card ${suit}`;
  card.innerHTML = `
    <div class="icon top-left">${getCardIcon(suit)}</div>
    <div class="icon bottom-right">${getCardIcon(suit)}</div>
    <div class="card-number">${value}</div>
  `;
  return card;
}

function getCardIcon(suit) {
  const icons = {
    spade: "♠",
    club: "♣",
    heart: "♥",
    diamond: "♦"
  };
  return icons[suit];
}

function sortCards() {
  if (cards.length === 0) return;

  log = [];
  currentIteration = 0;
  const sortedCards = bubbleSortWithIterations(cards.slice());
  cards = sortedCards;
  displayCards(cards);
  displayLog();
}

function bubbleSortWithIterations(array) {
  const n = array.length;
  const result = [...array];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (compareCards(result[j], result[j + 1]) > 0) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
    log.push({
      iteration: i + 1,
      sortedCards: result.slice() // Guardar el estado actual de las cartas
    });
  }
  return result;
}

function compareCards(card1, card2) {
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A"
  ];
  const value1 = values.indexOf(card1.value);
  const value2 = values.indexOf(card2.value);
  return value1 - value2;
}

function displayLog() {
  const logContainer = document.getElementById("logContainer");
  logContainer.innerHTML = log
    .map(
      entry => `
      <div>
        <strong>Iteración ${entry.iteration}:</strong>
        <div class="iteration-row">
          ${entry.sortedCards
            .map(card => {
              return createCardElement(card).outerHTML;
            })
            .join("")}
        </div>
      </div>
    `
    )
    .join("");
}
