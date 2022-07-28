## About Polle

Polle is an open-source platform where you can create polls, share them to get votes, and finally analyze them in the dashboard. See the number of votes on each answer, votes on each day, votes from different devices, and much more!

## 🚩 The Problem

Now, we know there are already a lot of **poll makers** in the market. They lack in one big thing, analytics and that's where **Polle** can help you. I used some of the poll makers out there and came to know that they don't have great analytics like we don't know from where the votes are coming, when are we getting the most votes, how many votes we got today, yesterday, or the day before yesterday, are we getting votes from mobile, desktop or tablet.

## 💡 The Idea

That's where I came up with the idea of **Polle**. It not only lets you build and share polls but also provides user-friendly charts for analyzing the polls. I was thinking to build such kind of app way before this hackathon. But when I heard about this hackathon, I was very motivated to build it.

Here are some reasons why I built **Polle** for this hackathon:

- To complete the entire project. I usually leave my projects incomplete in the middle. This hackathon really pushed me towards completing the entire project.
- To learn something new. This project helped me learn some new technologies like PlanetScale and Prisma.
- And of course for the swags and prizes 🤣.

## 🔥 Features

### 1. Landing Page

Not a feature though. But tried my best to build a nice-looking landing page.
![Landing Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1658944219483/b9mwMgjPo.png)

### 2. Authentication

I added authentication using JWT and Cookies.
![Signup Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1658944187130/T8hRZSO3Q.png align="left")

### 3. Dashboard

The dashboard shows an overview of the polls, votes and votes on the current day.
![Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1658944137653/kp4er1lJJ.png align="left")

### 4. Poll Creation

Users can not only create polls, but they can also customize and configure them. Users can:

1. Add a question and multiple answers. Also added drag/drop functionality to change the position of answers.
1. Pick a theme color for the poll.
1. Show a custom "thanks message" that the audience will see after submitting the vote.
1. Show or hide results. If results are hidden, the audience can't see the results after voting.
1. Enable or disable the poll anytime. The audience can't vote if the poll is disabled.
   ![Create New Poll](https://cdn.hashnode.com/res/hashnode/image/upload/v1658944088199/oEage-OFb.png align="left")

### 5. Polls Page

![Poll Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1658992768663/o3woFnh2w.png align="left")

### 6. Analytics

The analytics page shows:

1. Number of votes on each answer.
1. Number of notes on each day.
1. Votes from different devices like desktop, mobile, and tablet.
   ![Analytics](https://cdn.hashnode.com/res/hashnode/image/upload/v1658944437007/pn9HtFmd8.png align="left")

### 7. The Poll

This is the Poll page where users can vote and can also see the results if allowed by the creator.
![Poll](https://cdn.hashnode.com/res/hashnode/image/upload/v1658945036252/Z2yjgoggB.png align="left")

There are some other features and pages as well. Make sure to explore them.

## 👨‍💻 Tech Stack

1. **Next.js** - For building the entire App.
1. **Material-UI** - For building the UI.
1. **SASS** - CSS preprocessor.
1. **Chart.js** - For adding charts to the dashboard.
1. **Context API** - For managing state.
1. **Prisma** - For working with the database.
1. **PlanetScale** - As a database.
1. **JWT** - For authentication.
1. **Axios** - For consuming the API.
1. **Bcrypt** - For hashing passwords.
1. **React-Beautiful-DnD** - For drag/drop feature.
1. **Vercel** - For deployment.

I built the entire app using **Next.js** along with some other packages and deployed the app on **Vercel**.

## 🧱 Project Structure

```
-- components
    -- AnalyticsBox
    -- DashboardLayout
    -- Features
    -- Footer
    -- Header
    -- Hero
    -- HomeLayout
    -- Navbar
    -- Poll
    -- PollCustomize
    -- PollItem
    -- PollMaker
    -- PollManager
    -- PollSettings
    -- Seo
    -- SharePoll
-- context
    -- PollContext
    -- UserContext
-- lib
    -- getUser
    -- prisma
-- pages
    -- api
        -- auth
        -- polls
        -- votes
    -- dashboard
        -- analytics
        -- edit-poll
        -- create-poll
        -- index
        -- polls
    -- poll
    -- _app
    -- _document
    -- index
    -- login
    -- signup
-- prisma
    -- schema.prisma
-- src
-- styles
-- utils
```

## 😵‍💫 Process of Creation

As this was the first time I was working with PlanetScale and Prisma, so I had to cover some basic stuff before creating the project. I read this [blog post on PlanetScale by Camila Ramos](https://planetscale.com/blog/how-to-setup-next-js-with-prisma-and-planetscale) which gave me an overview of Prisma and PlanetScale. Then started reading the official docs of Prisma and PlanetScale. Once I covered the basics, then the next step:

```npm
npx create-next-app polle
```

Installed Prisma, set up PlanetScale, and created the schema. I started off by implementing authentication, then CRUD operations on the poll, then implemented analytics by using chart.js, and at the end built this cool logo:
![Logo](https://cdn.hashnode.com/res/hashnode/image/upload/v1658988177554/aEo74q9wz.png align="left")
Which is nothing but a copy of an emoji from Notion 🤣. I just changed its color using Figma 😊. I'm not a designer so I had to do this 😔. I also created an open-graph image using Canva:
![Open Graph Image](https://cdn.hashnode.com/res/hashnode/image/upload/v1658988466883/_a6AC9uT8.png align="left")

## 😕 Difficulties

Here are some difficulties that I faced during the development process:

1. As I'm not a designer, It was a bit hard for me to come up with a nice-looking UI.
1. I struggled with the analytics part. As I had never worked with charts before so adding charts and gathering data for them was hard for me.

## 🤖 Future Enhancements

These are some features that I thought of adding but was unable to do so. However, I will definitely add them in the future:

1. Dark mode.
1. Add images in the poll.
1. Add a description in the poll.
1. Ability to embed the polls in websites using iframe or some other technique.

## 🔗 Links

Live Preview: [polle.shahmir.me](https://polle.shahmir.me/)  
Github Repo: [github.com/shahmirfaisal/polle](https://github.com/shahmirfaisal/polle)

## 🧑 About Me

I'm Shahmir Faisal, currently pursuing my Bachelor's in Computer Engineering. I've been in the world of coding for 3 years now. I'm a web developer and my current stack consists of React, Next, Node, Express, and MongoDB. But now I will also include Prisma and PlanetScale 🔥.

## 🎇 Conclusion

In the end, I want to say thanks to Hashnode and PlanetScale for organizing such a great hackathon where we can learn and show our skills by building cool projects.
