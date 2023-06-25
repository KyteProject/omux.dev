---
name: "Cactuar - Feedback Bot"
postSlug: "cacutar"
categories: ["code"]
ogImage: "/images/pexels-kindel-media-8566526.jpg"
description: "A custom chat-bot for Discord music production communities"
extra: []
---

## Overview

- **Role:** Owner, Developer
- **Time:** 2018 - 2021
- **Status:** Innactive

## Technology

- **Architecture:** `Microservices`, `REST`, `gRPC`, `Pub/Sub`, `Websockets`

- **Database Management:** `Postgresql`, `MongoDB`, `Redis`

- **Deployment:** `Docker`, `Kubernetes`, `Google Cloud Platform`, `Jaeger`, `OpenTracing`

- **Language:** `Go`, `Node.js`, `Typescript`, `Javascript`, `Python`, `Bash`, `HTML`, `CSS`, `SQL`, `NoSQL`, `Discord.js`, `DiscordGo`

## Description

Cactuar is a custom chat-bot I developed to automate the moderation of feedback channels in music production Discord communities. Recognising the issue of users dropping tracks without providing feedback to others, I created Cactuar to implement a _"give before you receive"_ principle.

The bot analyses messages, assigns a score based on feedback quality, and only allows users to share their music once they've met a feedback provision threshold.

The project was originally developed in `Node.js`, and was later rewritten in `Go` (Golang). Cactuar has been highly successful in improving the quality of interactions in feedback channels and is now utilised across multiple communities, serving thousands of users.

## Accomplishments

- Served over 50,000 users in more than 30 community servers.

- Successfully developed and deployed a chatbot that enhances the quality of artist feedback channels by ensuring reciprocal feedback among users.

- Gamified the feedback process by implementing an experience/leveling system, encouraging users to actively provide feedback to their peers.

- Expanded the project with a microservices architecture using `Go`, with services communicating asynchronously via `pub/sub` and `gRPC`. Each service has its own `Postgresql` or `MongoDB` database and `API` as required.

## Links

- ~~Cactuar - Go Microservices~~ (Closed Source)
- [Cactuar - Production Node.js](https://github.com/KyteProject/cactuar-server)
- [Cactuar - Old Beta](https://github.com/KyteProject/cactuar-old)
