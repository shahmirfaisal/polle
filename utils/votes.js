export const getTotalVotes = (poll) => {
  return poll.answers.reduce((total, answer) => total + answer.votes.length, 0);
};

export const getVotesPercentage = (poll, answer) => {
  return +((answer.votes.length * 100) / getTotalVotes(poll)).toFixed(1);
};

export const getTodayVotes = (poll) => {
  let votesCount = 0;
  poll.answers.forEach((answer) => {
    answer.votes.forEach((vote) => {
      const voteDate = new Date(vote.createdAt);
      const currentDate = new Date();
      if (
        voteDate.getFullYear() == currentDate.getFullYear() &&
        voteDate.getMonth() == currentDate.getMonth() &&
        voteDate.getDate() == currentDate.getDate()
      )
        votesCount++;
    });
  });

  return votesCount;
};

export const getDeviceVotes = (poll) => {
  let deviceVotes = {
    Desktop: 0,
    Mobile: 0,
    Tablet: 0,
  };

  poll.answers.forEach((answer) =>
    answer.votes.forEach((vote) => {
      deviceVotes[vote.device]++;
    })
  );

  return deviceVotes;
};
