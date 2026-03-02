const noteForm = document.querySelector("#noteForm");
const plus = document.querySelector("#plus");
const form = document.querySelector("#callModal");
const sideControls = document.querySelector(".side-controls");
const cardStack = document.querySelector(".card-stack");
const createBtn = document.querySelector(".btn.create");
const closeBtn = document.querySelector(".btn.close");
const upBtn = document.querySelector(".circle-btn:nth-child(2)");
const downBtn = document.querySelector(".circle-btn:nth-child(3)");

const imageUrl = document.querySelector('input[placeholder*="http"]');
const fullName = document.querySelector('input[placeholder="Enter full name"]');
const homeTown = document.querySelector('input[placeholder="Enter home town"]');
const purpose = document.querySelector('input[placeholder*="appointment"]');

function getCards() {
  return JSON.parse(localStorage.getItem("cards")) || [];
}

function saveCards(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
}

plus.addEventListener("click", function () {
  form.style.display = "flex";
  sideControls.style.display = "none";
  cardStack.style.display = "none";
});

function createCard(data) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardTop = document.createElement("div");
  cardTop.classList.add("card-top");

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");

  const img = document.createElement("img");
  img.src = data.imageUrl;
  avatar.appendChild(img);

  const name = document.createElement("h3");
  name.classList.add("name");
  name.innerText = data.fullName;

  cardTop.appendChild(avatar);
  cardTop.appendChild(name);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  cardInfo.innerHTML = `
    <div class="info-col">
      <p class="label">Home town</p>
      <p class="label">Bookings</p>
    </div>
    <div class="info-col right">
      <p class="value">${data.homeTown}</p>
      <p class="value">${data.bookings}</p>
    </div>
  `;

  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  actions.innerHTML = `
    <button class="action-btn call">
      <img src="Assets/icons8-phone-50.png"> Call
    </button>
    <button class="action-btn message">Message</button>
  `;

  card.appendChild(cardTop);
  card.appendChild(cardInfo);
  card.appendChild(actions);

  return card;
}

function updateStackUI() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.classList.remove("card-1", "card-2", "card-3");
    if (index === 0) card.classList.add("card-1");
    if (index === 1) card.classList.add("card-2");
    if (index === 2) card.classList.add("card-3");
  });
}

function loadCards() {
  cardStack.innerHTML = "";
  const cards = getCards();
  cards.forEach(data => {
    const card = createCard(data);
    cardStack.appendChild(card);
  });
  updateStackUI();
}

loadCards();

createBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!imageUrl.value.trim()) return alert("Image URL is required");
  if (!fullName.value.trim()) return alert("Full Name is required");
  if (!homeTown.value.trim()) return alert("Home Town is required");
  if (!purpose.value.trim()) return alert("Purpose is required");

  const category = document.querySelector('input[name="category"]:checked');
  if (!category) return alert("Please select a category");

  const cards = getCards();

  const cardData = {
    imageUrl: imageUrl.value.trim(),
    fullName: fullName.value.trim(),
    homeTown: homeTown.value.trim(),
    purpose: purpose.value.trim(),
    category: category.nextElementSibling.innerText,
    bookings: "1 time"
  };

  cards.unshift(cardData); // newest on top
  saveCards(cards);

  loadCards();

  noteForm.reset();
  form.style.display = "none";
  sideControls.style.display = "flex";
  cardStack.style.display = "flex";
});

closeBtn.addEventListener("click", function () {
  form.style.display = "none";
  sideControls.style.display = "flex";
  cardStack.style.display = "flex";
});

upBtn.addEventListener("click", function () {
  const cards = getCards();
  if (cards.length < 2) return;
  cards.push(cards.shift());
  saveCards(cards);
  loadCards();
});

downBtn.addEventListener("click", function () {
  const cards = getCards();
  if (cards.length < 2) return;
  cards.unshift(cards.pop());
  saveCards(cards);
  loadCards();
});