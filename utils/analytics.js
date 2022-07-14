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

let colors = [];

export const getDoughnutGraph = (poll) => {
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

export const getLineGraph = (poll) => {
  let borderColors;

  if (colors.length) {
    borderColors = colors;
  } else {
    borderColors = poll.answers.map(() => randColor());
    colors = borderColors;
  }

  let lineLabels = [];
  poll.answers.forEach((answer) => {
    answer.votes.forEach((vote) =>
      lineLabels.push(moment(vote.createdAt).format("MMMM Do"))
    );
  });
  lineLabels = [...new Set(lineLabels)];

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
