document.getElementById("drawBtn").addEventListener("click", drawCards);
document.getElementById("sortBtn").addEventListener("click", sortCards);

let cards = [];
let log = [];
let currentIteration = 0;

function drawCards() {
  const cardCount = parseInt(document.getElementById("cardCount").value) || 0;
  cards = generateRandomCards(cardCount);
  displayCards(cards);
  log = []; // Reset log after drawing new cards
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
  const sortedCards = bubbleSort(cards.slice());
  log.push({
    timestamp: new Date().toLocaleTimeString(),
    sortedCards: sortedCards
      .map(card => `${card.value}${getCardIcon(card.suit)}`)
      .join(", ")
  });
  displaySortedCards(sortedCards);
  displayLog();
}

function bubbleSort(array) {
  const n = array.length;
  let iterations = 0;
  const result = [...array];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (compareCards(result[j], result[j + 1]) > 0) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
    iterations++;
    log.push({
      timestamp: new Date().toLocaleTimeString(),
      sortedCards: result
        .map(card => `${card.value}${getCardIcon(card.suit)}`)
        .join(", ")
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

function displaySortedCards(sortedCards) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";
  const rows = Math.ceil(sortedCards.length / 3);

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.className = "d-flex";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      if (index < sortedCards.length) {
        const cardElement = createCardElement(sortedCards[index]);
        row.appendChild(cardElement);
      }
    }
    cardsContainer.appendChild(row);
  }
}

function displayLog() {
  const logContainer = document.getElementById("logContainer");
  logContainer.innerHTML = log
    .map(
      entry => `
        <div>
            <strong>${entry.timestamp}:</strong>
            <div class="d-flex">
                ${entry.sortedCards
                  .split(", ")
                  .map(cardStr => {
                    const [value, icon] = cardStr.split(
                      /(?<=\d)(?=\D)|(?<=\D)(?=\d)/
                    );
                    return `<div class="card">${
                      icon
                        ? `<div class="icon top-left">${icon}</div><div class="icon bottom-right">${icon}</div>`
                        : ""
                    }<div class="card-number">${value}</div></div>`;
                  })
                  .join("")}
            </div>
        </div>
    `
    )
    .join("");
}
