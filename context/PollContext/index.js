import { createContext, useState } from "react";

export const PollContext = createContext();

export const PollContextProvider = ({ children }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([{ id: 1, value: "" }]);
  const [thanksMessage, setThanksMessage] = useState("Thank You!");

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

  const state = {
    question,
    changeQuestionHandler,
    answers,
    changeAnswerHandler,
    addAnswer,
    removeAnswer,
    thanksMessage,
    changeThanksMessageHandler,
  };

  return <PollContext.Provider value={state}>{children}</PollContext.Provider>;
};
