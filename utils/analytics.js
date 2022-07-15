import moment from "moment";

const randColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};

export let colors = [];

export const getPollDoughnutGraph = (poll) => {
  let backgroundColor;

  if (colors.length) {
    backgroundColor = colors;
  } else {
    backgroundColor = poll.answers.map(() => randColor());
    colors = backgroundColor;
  }

  const newDoughnutDataSet = {
    labels: poll.answers.map((answer) => `Votes for ${answer.name}`),
    datasets: [
      {
        label: poll.question,
        data: poll.answers.map((answer) => answer.votes.length),
        backgroundColor,
        hoverOffset: 4,
      },
    ],
  };

  return newDoughnutDataSet;
};

export const getPollLineGraph = (poll) => {
  let borderColors;

  if (colors.length) {
    borderColors = colors;
  } else {
    borderColors = poll.answers.map(() => randColor());
    colors = borderColors;
  }

  // Creating Labels
  let lineLabels = [];
  // Getting all the dates from poll creation date to the current date
  let dateIncrementor = 0;
  while (true) {
    const date = moment(poll.createdAt)
      .add(dateIncrementor, "days")
      .format("MMMM Do");
    lineLabels.push(date);
    if (date === moment().format("MMMM Do")) break;
    dateIncrementor++;
  }
  lineLabels = [...new Set(lineLabels)];

  // Creating Data for each of those labels
  const lineData = [];

  poll.answers.forEach((answer, i) => {
    let data = new Array(lineLabels.length).fill(0);
    answer.votes.forEach((vote) => {
      if (lineLabels.includes(moment(vote.createdAt).format("MMMM Do"))) {
        data[lineLabels.indexOf(moment(vote.createdAt).format("MMMM Do"))]++;
      }
    });

    lineData.push({
      label: `Votes for ${answer.name}`,
      data: data,
      borderColor: borderColors[i],
      tension: 0.1,
      fill: false,
    });
  });

  const newLineDataSet = {
    labels: lineLabels,
    datasets: lineData,
  };

  return newLineDataSet;
};

export const getUserLineGraph = (user, polls) => {
  let borderColors;

  if (colors.length) {
    borderColors = colors;
  } else {
    borderColors = polls.map(() => randColor());
    colors = borderColors;
  }

  // Creating Labels
  let lineLabels = [];
  // Getting all the dates from poll creation date to the current date
  let dateIncrementor = 0;
  while (true) {
    const date = moment(user.createdAt)
      .add(dateIncrementor, "days")
      .format("MMMM Do");
    lineLabels.push(date);
    if (date === moment().format("MMMM Do")) break;
    dateIncrementor++;
  }
  lineLabels = [...new Set(lineLabels)];

  // Creating Data for each of those labels
  const lineData = [];

  polls.forEach((poll, i) => {
    let data = new Array(lineLabels.length).fill(0);

    poll.answers.forEach((answer) => {
      answer.votes.forEach((vote) => {
        if (lineLabels.includes(moment(vote.createdAt).format("MMMM Do"))) {
          data[lineLabels.indexOf(moment(vote.createdAt).format("MMMM Do"))]++;
        }
      });
    });

    lineData.push({
      label: `Votes for ${poll.question}`,
      data: data,
      borderColor: borderColors[i],
      tension: 0.1,
      fill: false,
    });
  });

  const newLineDataSet = {
    labels: lineLabels,
    datasets: lineData,
  };

  return newLineDataSet;
};
