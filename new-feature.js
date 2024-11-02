// new-feature.js

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why don't eggs tell jokes? They'd crack each other up!",
  "Why did the tomato turn red? Because it saw the salad dressing!",
  "What do you call a fake noodle? An impasta!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
];

function printJoke() {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  console.log(jokes[randomIndex]);
}

printJoke();