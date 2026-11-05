import { ITEMS_ENDPOINT } from "./config.js";
import { Bot } from "./bot.js";

////////////////////// GLOBAL VARIABLES
let currentTaskId = 0;
let bot = new Bot();

////////////////////// FUNCTIONS TO HANDLE BACKEND API RESPONSES
///// Get items from database
async function getItems(url) {
  try {
    const response = await fetch(url); // call items API Get endpoint

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(
        `Server error: ${response.status} ${response.statusText}`,
      );
    }

    // because the fetch is asyncronous to get the json response we must wait for the promise to finish executing
    const items = await response.json();
    return items;
  } catch (error) {
    console.log("Error fetching items:", error);
  }
}

///// Add
//  items to database
async function addItem(newItem, url) {
  try {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        itemname: newItem,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.error("Failed to add item to database:", error);
  }
}

////////////////////// FUNCTIONS TO HANDLE BOT
function updateBot(memoryType, data) {
  bot.updateMemory(memoryType, data);
}

function botTalk() {
  const bubble = document.getElementById("bot-bubble");
  bubble.textContent = bot.botTalk();
  bubble.classList.add("show");

  // Esconde o balão depois de 5 segundos
  clearTimeout(bubble._hideTimer);
  bubble._hideTimer = setTimeout(() => {
    bubble.classList.remove("show");
  }, 5000);
}

// O "idle chatter" — o cliente decide QUANDO, o servidor decide O QUÊ
function scheduleBotChat() {
  const minDelay = 10000; // 10s
  const maxDelay = 50000; // 50s
  const delay = Math.random() * (maxDelay - minDelay) + minDelay;

  setTimeout(async () => {
    await botTalk(); // estado atual da checklist
    scheduleBotChat(); // 👈 cadeia: agenda a próxima
  }, delay);
}
////////////////////// FUNCTIONS TO HANDLE DOM GRAPHICS

////////// Create list element for item
function createListElement(itemName, isAcquired) {
  currentTaskId++;
  // Add items to item list
  let itemlist = document.getElementById("itemlist");
  // create item element
  let listItem = document.createElement("li");
  listItem.classList.add("checklist-item");
  if (isAcquired) listItem.classList.add("completed");
  // create label element to nest check box and the item name
  let label = document.createElement("label");
  label.className = "checklist-item-label";
  label.setAttribute("for", `task${currentTaskId}`);
  // create checkbox element
  let input = document.createElement("input");
  input.className = "checklist-item-checkbox";
  input.setAttribute("type", "checkbox");
  input.id = `task${currentTaskId}`;
  // create span element with the item name
  let span = document.createElement("span");
  span.className = "label-text";
  span.textContent = itemName;

  // insert elements to their parents
  label.appendChild(input);
  label.appendChild(span);
  listItem.appendChild(label);
  itemlist.appendChild(listItem);

  // update bot
  updateBot("itemList", itemName);
}

//  Populate the checklist
async function populateChecklist() {
  try {
    // Get items in database
    const items = await getItems(ITEMS_ENDPOINT);

    // create new list element for each item
    for (const item of items) {
      createListElement(item.ITEMNAME, item.ISACQUIRED);
    }
  } catch (error) {
    console.error("Error populating item list:", error);
  }
}

////////////////////// EXECUTE FUNCTIONS

// Add click animation to the Bot
document.querySelector(".bot-avatar").addEventListener("click", () => {
  const avatar = document.querySelector(".bot-avatar");
  avatar.style.animation = "none";
  avatar.style.transform = "scale(1.3) rotate(10deg)";
  setTimeout(() => {
    avatar.style.transform = "";
    avatar.style.animation = "";
  }, 150);
  botTalk();
});

// Excute logic when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async (e) => {
  await populateChecklist();

  // Add event listener to the form only after the DOM content is fully loaded
  const form = document.querySelector(".form-new-item");
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload

    const input = document.querySelector(".form-new-item-input");
    const newItem = input.value.trim();

    if (!newItem) return; // Skip if empty

    // Add the item to the DOM immediately
    createListElement(newItem, 0);

    // Clear the input
    input.value = "";

    // Send the item to the database asynchronously
    try {
      await addItem(newItem, ITEMS_ENDPOINT);
    } catch (error) {
      console.error("Failed to add item to database:", error);
    }
  });

  scheduleBotChat();
});
