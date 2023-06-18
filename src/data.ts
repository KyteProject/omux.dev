export interface Collaborator {
  name: string
  github: string
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  category: string
  image: string
  repoLink: string | null
  demoLink: string | null
  collaborator: Collaborator | null
}

export const projects: Project[] = [
  {
    name: "Omux.dev",
    description: "Personal blog and portfolio, buils using Astro.js",
    technologies: [],
    category: "other",
    image: "/images/pexels-kevin-ku-577585.jpg",
    repoLink: null,
    demoLink: null,
    collaborator: null
  },
  {
    name: "UkemiBot",
    description:
      "A discord chatbot using Node.js and the Discord.js library. The bot is to help with organising company resources on Discord. Plans are to interface with Google Drives's API to allow for direct communication and control through automation and commands on the Discord platform.",
    technologies: [],
    category: "code",
    image: "/images/pexels-kevin-ku-577585.jpg",
    repoLink: null,
    demoLink: null,
    collaborator: null
  },
  {
    name: "Cactuar - Feedback Bot",
    description:
      "A custom chatbot for music production Discord communities. The bot addresses the need for automating the moderation of feedback channels.",
    technologies: [],
    category: "code",
    image: "/images/pexels-kevin-ku-577585.jpg",
    repoLink: null,
    demoLink: null,
    collaborator: null
  },
  {
    name: "The Movement Card",
    description:
      "The movement card is part resource, part research and part response action created to promote freedom of movement. It is a worldwide project started in Scotland through a collaboration between Ukemi and Parkour Outreach.",
    technologies: [],
    category: "code",
    image: "/images/projects/movementcard.png",
    repoLink: "https://github.com/ukemi-project/mvmnt-card.com",
    demoLink: "https://mvmnt-card.com",
    collaborator: null
  },
  {
    name: "Balance Marathon",
    description:
      "Balance Marathon is an annual community art project that aims to raise awareness around mental health, connect the global movement community and improve wellbeing through action. The act of balancing on a rail, putting one foot in front of the other, and the support needed to pull off the attempt is symbolic of the struggles many people face on a daily basis.",
    technologies: [],
    category: "other",
    image: "/images/projects/handrail.jpg",
    repoLink: null,
    demoLink: null,
    collaborator: null
  },
  {
    name: "Ukemi Card Game",
    description:
      "Ukemi is the worlds first parkour/freerunning card game. It is a random chance movement game that improves the player's ability to assess risk and develop quality movement. The base movements are derived from the disciplines of parkour, freerunning and broader movement culture.  My team and I took an idea and developed it into a product, I took the lead on the design and branding and over 7 months we created two prototypes, funded the project through crowdfunding pre-sales, sourced our supplier in China and brought it to market.  The game is now in use in over 15 international countries and we have received only positive feedback so far.",
    technologies: [],
    category: "other",
    image: "/images/projects/cards-2.jpg",
    repoLink: null,
    demoLink: null,
    collaborator: null
  },
  {
    name: "Youth Urban Games",
    description:
      "Working in collaboration with Sport Inspired and Scottish Canals charities the Youth Urban Games was a fantastic success. The project was to design, develop, and project manage the parkour side of the event. This involved developing the formats, designing the course, recruiting athletes, marketing and securing participants, and managing everything on the day.",
    technologies: [],
    category: "other",
    image: "/images/projects/IMG_0080.jpg",
    repoLink: null,
    demoLink: null,
    collaborator: null
  },
  {
    name: "SquareGo",
    description:
      "SquareGo is a location-based club and sports management app as well as a payment system and organisational tool for events and competitions - sports, e-sports, table-top games, and activities.",
    technologies: [],
    category: "code",
    image: "/images/projects/sg-bg-2.png",
    repoLink: "",
    demoLink: null,
    collaborator: null
  },
  {
    name: "Ukemi.ninja",
    description:
      "Designed and developed the company website. Currently, HTML/CSS/Javascript based on the Bootstrap framework. Later integrated with separately installed Wordpress blog and developing a custom theme to match the main website.  Currently, I am in the process of rebuilding the website to use server-side rendering with React.js for better performance and maintainability. This also allows for API development and integration with future projects.",
    technologies: [],
    category: "code",
    image: "/images/projects/ukemi-logo.jpg",
    repoLink: "https://github.com/ukemi-project/ukemi.ninja-2019",
    demoLink: "https://ukemi.ninja",
    collaborator: null
  },
  {
    name: "Aberdeen Parkour",
    description:
      "Being one of the first people in Scotland to do parkour I naturally became a community leader. Over the years I have made multiple websites, community forums, IRC chat groups, and organised thousands of meetups/training sessions. Currently, the most recent manifestation of this is the Aberdeen Parkour Facebook group that I have been operating since 2009 and has over 600 members.",
    technologies: [],
    category: "other",
    image: "/images/projects/jump.jpg",
    repoLink: null,
    demoLink: "https://www.facebook.com/groups/AberdeenParkour",
    collaborator: null
  }
]
