import Image from "next/image";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Feature } from "./Feature";

export const Features = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 30 }}>
      <Feature
        title="Create POLLS in a few minutes"
        text="Easily craft your POLL with our easy-to-use editor."
        image="/create-poll.png"
      />
      <Feature
        title="Distribute it and get votes"
        text="Poll creation is only half the battle. Share your poll with friends, family, organizations or groups to get votes - all for free!"
        image="/share-poll.png"
      />
      <Feature
        title="View analytics and stats of those polls"
        text="Analyze key stats like total number of votes, average number of votes per day, most popular answer and more. All in one place."
        image="/analytics.png"
      />
    </Container>
  );
};
