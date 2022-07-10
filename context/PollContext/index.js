import { createContext, useState } from "react";
import axios from "axios";
import { errorHandler } from "../../utils/errorHandler";
import { NotificationManager } from "react-notifications";

export const PollContext = createContext();

export const PollContextProvider = ({ children }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([{ id: 1, value: "" }]);
  const [thanksMessage, setThanksMessage] = useState("Thank You!");
  const [themeColor, setThemeColor] = useState("#1976D2");
  const [showResults, setShowResults] = useState(true);
  const [loading, setLoading] = useState(false);

  const changeQuestionHandler = (e) => setQuestion(e.target.value);
  const changeAnswerHandler = (id, newValue) => {
    const newAnswers = [...answers];
    newAnswers.map((answer) => {
      if (answer.id === id) answer.value = newValue;
    });
    setAnswers(newAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, { id: answers.length + 1, value: "" }]);
  };
  const removeAnswer = (id) => {
    setAnswers(answers.filter((answer) => answer.id !== id));
  };

  const changeThanksMessageHandler = (message) => setThanksMessage(message);

  const changeThemeColorHandler = (color) => {
    setThemeColor(color.hex);
  };

  const changeShowResultsHandler = (event) => {
    setShowResults(event.target.checked);
  };

  const createPollHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.post("/api/polls", {
        question,
        themeColor,
        thanksMessage,
        showResults,
        answers: answers
          .filter((answer) => answer.value.trim().length)
          .map((answer) => ({ name: answer.value.trim() })),
      });
      NotificationManager.success("Poll Created!");
      console.log(data);
    } catch (error) {
      errorHandler(error);
    }

    setLoading(false);
  };

  const state = {
    question,
    changeQuestionHandler,
    answers,
    changeAnswerHandler,
    addAnswer,
    removeAnswer,
    thanksMessage,
    changeThanksMessageHandler,
    themeColor,
    changeThemeColorHandler,
    showResults,
    changeShowResultsHandler,
    createPollHandler,
    loading,
  };

  return <PollContext.Provider value={state}>{children}</PollContext.Provider>;
};
