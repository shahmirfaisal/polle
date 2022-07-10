const axios = require("axios");

axios
  .post("http://localhost:3000/api/polls", {
    question: "Who are you?",
    answers: [{ name: "Shahmir" }],
  })
  .then((res) => console.log(res.data))
  .catch((error) => {
    console.log(error.message);
  });
