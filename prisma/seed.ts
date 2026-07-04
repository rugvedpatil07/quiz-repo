import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Seeding the database with more quizzes...');

  // 1. Ensure at least one user exists to act as the creator
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'System Admin',
        email: 'admin@quizmaster.com',
        password: 'hashed_password_placeholder', // Dummy password
        bio: 'Platform Administrator',
      }
    });
    console.log(`Created System Admin user with ID: ${user.id}`);
  } else {
    console.log(`Found existing user for creator with ID: ${user.id}`);
  }

  const quizzes = [
    {
      title: "Advanced JavaScript Concepts",
      description: "Test your knowledge of closures, prototypes, event loops, and modern ES6+ features.",
      category: "Programming",
      subcategory: "Javascript",
      creatorId: user.id,
      timeLimit: 300,
      questions: {
        create: [
          {
            text: "What will `console.log(typeof null)` output in JavaScript?",
            options: {
              create: [
                { text: "null", isCorrect: false },
                { text: "undefined", isCorrect: false },
                { text: "object", isCorrect: true },
                { text: "string", isCorrect: false },
              ]
            }
          },
          {
            text: "Which of the following is NOT a JavaScript scope?",
            options: {
              create: [
                { text: "Global Scope", isCorrect: false },
                { text: "Local/Function Scope", isCorrect: false },
                { text: "Block Scope", isCorrect: false },
                { text: "Package Scope", isCorrect: true },
              ]
            }
          },
          {
            text: "What is the purpose of the Event Loop in JavaScript?",
            options: {
              create: [
                { text: "To loop through arrays quickly", isCorrect: false },
                { text: "To handle asynchronous callbacks by putting them in the call stack when it is empty", isCorrect: true },
                { text: "To trigger DOM events", isCorrect: false },
                { text: "To execute synchronous code in the background", isCorrect: false },
              ]
            }
          }
        ]
      }
    },
    {
      title: "Space & Universe Basics",
      description: "How much do you really know about the cosmos, planets, and galaxies?",
      category: "General Knowledge",
      subcategory: "General Science",
      creatorId: user.id,
      timeLimit: 300,
      questions: {
        create: [
          {
            text: "What is the most abundant gas in the Earth's atmosphere?",
            options: {
              create: [
                { text: "Oxygen", isCorrect: false },
                { text: "Hydrogen", isCorrect: false },
                { text: "Nitrogen", isCorrect: true },
                { text: "Carbon Dioxide", isCorrect: false },
              ]
            }
          },
          {
            text: "Which planet is known as the Red Planet?",
            options: {
              create: [
                { text: "Venus", isCorrect: false },
                { text: "Jupiter", isCorrect: false },
                { text: "Mars", isCorrect: true },
                { text: "Saturn", isCorrect: false },
              ]
            }
          },
          {
            text: "What galaxy is Earth located in?",
            options: {
              create: [
                { text: "Andromeda", isCorrect: false },
                { text: "Milky Way", isCorrect: true },
                { text: "Triangulum", isCorrect: false },
                { text: "Sombrero", isCorrect: false },
              ]
            }
          },
          {
            text: "What is the largest planet in our solar system?",
            options: {
              create: [
                { text: "Earth", isCorrect: false },
                { text: "Jupiter", isCorrect: true },
                { text: "Saturn", isCorrect: false },
                { text: "Neptune", isCorrect: false },
              ]
            }
          }
        ]
      }
    },
    {
      title: "React.js Mastery",
      description: "Dive deep into React hooks, component lifecycles, and state management.",
      category: "Programming",
      subcategory: "React",
      creatorId: user.id,
      timeLimit: 600,
      questions: {
        create: [
          {
            text: "Which hook should be used for data fetching in a functional component?",
            options: {
              create: [
                { text: "useState", isCorrect: false },
                { text: "useContext", isCorrect: false },
                { text: "useEffect", isCorrect: true },
                { text: "useReducer", isCorrect: false },
              ]
            }
          },
          {
            text: "What does 'Lifting State Up' mean in React?",
            options: {
              create: [
                { text: "Moving state to a common ancestor component to share it between siblings", isCorrect: true },
                { text: "Using Redux for state management", isCorrect: false },
                { text: "Passing state down as props", isCorrect: false },
                { text: "Storing state in LocalStorage", isCorrect: false },
              ]
            }
          },
          {
            text: "What is the Virtual DOM?",
            options: {
              create: [
                { text: "A physical DOM node that is hidden", isCorrect: false },
                { text: "An in-memory representation of the real DOM elements generated by React", isCorrect: true },
                { text: "A browser API for fast rendering", isCorrect: false },
                { text: "A 3D rendering engine for React", isCorrect: false },
              ]
            }
          }
        ]
      }
    },
    {
      title: "Fundamentals of Networking",
      description: "Essential networking concepts, OSI model, protocols, and IP addressing.",
      category: "Computer",
      subcategory: "Networking",
      creatorId: user.id,
      timeLimit: 450,
      questions: {
        create: [
          {
            text: "Which layer of the OSI model does the IP protocol operate on?",
            options: {
              create: [
                { text: "Transport Layer", isCorrect: false },
                { text: "Network Layer", isCorrect: true },
                { text: "Data Link Layer", isCorrect: false },
                { text: "Application Layer", isCorrect: false },
              ]
            }
          },
          {
            text: "What port does HTTP use by default?",
            options: {
              create: [
                { text: "21", isCorrect: false },
                { text: "22", isCorrect: false },
                { text: "80", isCorrect: true },
                { text: "443", isCorrect: false },
              ]
            }
          },
          {
            text: "What does DNS stand for?",
            options: {
              create: [
                { text: "Domain Name System", isCorrect: true },
                { text: "Data Network Service", isCorrect: false },
                { text: "Dynamic Node Server", isCorrect: false },
                { text: "Digital Name Server", isCorrect: false },
              ]
            }
          }
        ]
      }
    }
  ];

  for (const quizData of quizzes) {
    const quiz = await prisma.quiz.create({
      data: quizData
    });
    console.log(`Created Quiz: ${quiz.title}`);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
