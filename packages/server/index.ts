import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import { createClientAndConnect } from './db';

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});

app.get('/user', (_, res) => {
  res.json({ name: '</script>Степа', secondName: 'Степанов' });
});

app.get('/forum', (_, res) => {
  res.json({
    topicList: [
      {
        id: 1,
        creator: 'John Doe',
        comments: 3,
        title: 'Damn, this game is insane!',
        createdAt: '2024-11-27',
        description:
          'This game isn’t just good, it’s amazing. The graphics? Incredible. The gameplay? So smooth, it feels like you’re playing a movie. But the best part? I’ve been playing for hours and haven’t even seen all the content yet. Damn, I might lose my job because of this game.',
        messages: [
          {
            id: 1,
            topicId: 1,
            author: 'Ivan Ivanov',
            createdAt: '2024-11-27',
            message:
              'I’m absolutely hooked! The feeling of absorbing cells is something incredible. Every new level, every new absorption feels like a small victory. The graphics are amazing, and the gameplay keeps you on the edge. It’s one of those games where you lose track of time while playing.',
          },
          {
            id: 2,
            topicId: 1,
            author: 'Marina Kuznetsova',
            createdAt: '2024-11-27',
            message:
              'I completely agree! This game is just magnetic. Even when I’m a small cell, I can feel myself growing stronger and stronger. The thrill of surviving and absorbing others is just awesome! And that moment when you become a giant and start dominating the map... just amazing!',
          },
          {
            id: 3,
            topicId: 1,
            author: 'Dmitry Sidorov',
            createdAt: '2024-11-27',
            message:
              'The gameplay is incredibly engaging. I love how my position on the field changes with each absorption. It makes you want to constantly improve your tactics and try new strategies to get stronger. Every match is like a new story, and every time you feel progress!',
          },
        ],
      },
      {
        id: 2,
        creator: 'Jane Smith',
        comments: 4,
        title: 'Why are the servers so unstable?!',
        createdAt: '2024-11-26',
        description:
          'Okay, seriously, what the hell is going on with these servers? I’ve been kicked out of games like five times today, and it’s driving me crazy. It’s 2024, can we get some stable servers already? The game is awesome, but the lag is ruining it. If I see that damn “Connection Lost” screen one more time, I’m going to lose it.',
        messages: [
          {
            id: 1,
            topicId: 2,
            author: 'Olga Belova',
            createdAt: '2024-11-26',
            message:
              'Despite the server issues, this game is incredibly fun. Every battle with other cells is a blast, and when I manage to grow into a giant, I literally feel my power. It’s so thrilling! I’m hoping they fix the server issues soon, but even with some lag, it’s still an awesome experience.',
          },
          {
            id: 2,
            topicId: 2,
            author: 'Pavel Popov',
            createdAt: '2024-11-26',
            message:
              'This game is so addictive! Even with the server issues, I keep coming back to play. The feeling of absorbing cells and growing stronger with each level is just amazing. I can’t wait for the servers to stabilize so we can enjoy it without interruptions.',
          },
          {
            id: 3,
            topicId: 2,
            author: 'Elena Vorobyova',
            createdAt: '2024-11-26',
            message:
              'Each match is a real survival challenge! When you manage to grow and become a giant cell, it’s an unbeatable feeling. This game is so unique, and even though there are some server issues, I’m still enjoying every second. I hope they’ll fix the servers soon so we can play without any interruptions.',
          },
        ],
      },
      {
        id: 3,
        creator: 'Alex Johnson',
        comments: 2,
        title: 'This damn lootbox system needs to go!',
        createdAt: '2024-11-25',
        description:
          'I’m so tired of this lootbox scam. Why the hell do I have to pay to get better gear or rare skins for my cell? Hell no. You can’t release an awesome game and then lock everything behind a paywall. Either give me everything for free or don’t waste my time. I’m not going to waste my money on this BS.',
        messages: [
          {
            id: 1,
            topicId: 3,
            author: 'Roman Kovalev',
            createdAt: '2024-11-25',
            message:
              'I’m not totally against lootboxes if they only offer cosmetics. But when they start giving actual power-ups or rare gear, that’s a different story. I’d prefer if they focused on adding more content and new maps instead of pushing paid elements. The game itself is already so much fun!',
          },
          {
            id: 2,
            topicId: 3,
            author: 'Natalia Sokolova',
            createdAt: '2024-11-25',
            message:
              'Honestly, I’m not too bothered by lootboxes. What really matters is that the core of the game is so engaging. Becoming stronger, outmaneuvering others, and surviving on the map — that’s the real fun. I’m hoping they add even more maps and new game modes, so we can have even more ways to enjoy it.',
          },
        ],
      },
      {
        id: 4,
        creator: 'Emily White',
        comments: 1,
        title: 'The new update is a disaster!',
        createdAt: '2024-11-20',
        description:
          'I don’t know what the devs were thinking, but this new update is an absolute disaster. Bugs everywhere, controls are messed up, and the game’s performance is worse than before. It feels like they rushed this out just to get people to stop complaining. Well, guess what? We’re complaining even more now. Fix it, devs.',
        messages: [
          {
            id: 1,
            topicId: 4,
            author: 'Victor Schmidt',
            createdAt: '2024-11-20',
            message:
              'Even though there are some bugs, this update still brought a lot of new content! I’m so excited about the new maps, and becoming even bigger and stronger is amazing. The graphics are even more vibrant, and the gameplay is faster and more dynamic. I’m looking forward to them fixing the issues, but I’m still enjoying the game a lot.',
          },
        ],
      },
      {
        id: 5,
        creator: 'Michael Brown',
        comments: 3,
        title: 'Why the hell is PvP so unbalanced?',
        createdAt: '2024-11-18',
        description:
          'I keep getting wrecked in PvP by players with much better gear and higher levels, and it’s driving me nuts. How can you enjoy the game when the matchmaking is so broken? I can’t even get a fair fight without getting stomped by some level 1000 guy who’s clearly been spending money on the game. It feels like they designed PvP just to piss us off.',
        messages: [
          {
            id: 1,
            topicId: 5,
            author: 'Artem Dyakov',
            createdAt: '2024-11-18',
            message:
              'I actually enjoy the challenge in PvP! Even when you’re up against stronger opponents, it pushes you to become better and develop new strategies. It’s like a survival test, and every match is an opportunity to improve your skills. When you finally beat that stronger opponent, it feels like a real achievement!',
          },
          {
            id: 2,
            topicId: 5,
            author: 'Irina Smirnova',
            createdAt: '2024-11-18',
            message:
              'Yes, PvP can be tough sometimes, but that’s what makes the game exciting. When you’re a small cell, you have to maneuver and find creative ways to win. It’s all about developing strategies to overcome stronger opponents, and I love that dynamic. Every match is unpredictable, and that’s what makes it fun!',
          },
          {
            id: 3,
            topicId: 5,
            author: 'Dmitry Artemov',
            createdAt: '2024-11-18',
            message:
              'I really like the unpredictability of PvP! Even if your opponent is stronger, there’s always a chance to survive and win. It’s a test of endurance and strategy. I love when I manage to pull off a great move and come out on top. The feeling of overcoming the odds is awesome!',
          },
        ],
      },
    ],
    paginationOptions: {
      page: 1,
      total: 5,
    },
  });

  return res;
});
