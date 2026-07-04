import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Seeding the database with one quiz per category...');

  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: { name: 'System Admin', email: 'admin@quizmaster.com', password: 'hashed_password_placeholder' }
    });
  }

  const quizzes = [
    {
      title: "UPSC Prelims Mock Test",
      description: "Test your knowledge on Indian polity, history, and current events for the UPSC exam.",
      category: "Competitive Exams",
      subcategory: "UPSC",
      creatorId: user.id,
      timeLimit: 600,
      questions: {
        create: [
          {
            text: "Who was the first Governor-General of independent India?",
            options: {
              create: [
                { text: "Lord Mountbatten", isCorrect: true },
                { text: "C. Rajagopalachari", isCorrect: false },
                { text: "Dr. Rajendra Prasad", isCorrect: false },
                { text: "Jawaharlal Nehru", isCorrect: false }
              ]
            }
          }
        ]
      }
    },
    {
      title: "Cloud Computing Fundamentals",
      description: "Basic concepts of AWS, Azure, GCP, and cloud infrastructure.",
      category: "Computer",
      subcategory: "Cloud Computing",
      creatorId: user.id,
      timeLimit: 300,
      questions: {
        create: [
          {
            text: "Which of the following is an example of PaaS?",
            options: {
              create: [
                { text: "Amazon EC2", isCorrect: false },
                { text: "Google App Engine", isCorrect: true },
                { text: "Microsoft Word", isCorrect: false },
                { text: "AWS S3", isCorrect: false }
              ]
            }
          }
        ]
      }
    },
    {
      title: "GATE Computer Science 2024",
      description: "Practice questions for Data Structures, Algorithms, and OS.",
      category: "Engineering & GATE",
      subcategory: "Computer Science",
      creatorId: user.id,
      timeLimit: 900,
      questions: {
        create: [
          {
            text: "What is the time complexity of binary search?",
            options: {
              create: [
                { text: "O(n)", isCorrect: false },
                { text: "O(n log n)", isCorrect: false },
                { text: "O(log n)", isCorrect: true },
                { text: "O(1)", isCorrect: false }
              ]
            }
          }
        ]
      }
    },
    {
      title: "Python Programming Basics",
      description: "Test your Python syntax, data types, and logic.",
      category: "Programming",
      subcategory: "Python Program",
      creatorId: user.id,
      timeLimit: 300,
      questions: {
        create: [
          {
            text: "How do you define a function in Python?",
            options: {
              create: [
                { text: "function myFunction()", isCorrect: false },
                { text: "def myFunction():", isCorrect: true },
                { text: "func myFunction()", isCorrect: false },
                { text: "define myFunction():", isCorrect: false }
              ]
            }
          }
        ]
      }
    },
    {
      title: "Macroeconomics Principles",
      description: "GDP, inflation, and monetary policy basics.",
      category: "Graduation & PG",
      subcategory: "Economics",
      creatorId: user.id,
      timeLimit: 400,
      questions: {
        create: [
          {
            text: "What does GDP stand for?",
            options: {
              create: [
                { text: "Gross Domestic Product", isCorrect: true },
                { text: "Gross Domestic Price", isCorrect: false },
                { text: "General Domestic Product", isCorrect: false },
                { text: "Global Domestic Product", isCorrect: false }
              ]
            }
          }
        ]
      }
    },
    {
      title: "World History Trivia",
      description: "Major historical events and timelines from around the globe.",
      category: "General Knowledge",
      subcategory: "World History",
      creatorId: user.id,
      timeLimit: 300,
      questions: {
        create: [
          {
            text: "In which year did World War II end?",
            options: {
              create: [
                { text: "1940", isCorrect: false },
                { text: "1945", isCorrect: true },
                { text: "1918", isCorrect: false },
                { text: "1939", isCorrect: false }
              ]
            }
          }
        ]
      }
    },
    {
      title: "NEET Biology Mock Test",
      description: "Human physiology, plant biology, and genetics.",
      category: "Medical Exams",
      subcategory: "NEET",
      creatorId: user.id,
      timeLimit: 600,
      questions: {
        create: [
          {
            text: "What is the powerhouse of the cell?",
            options: {
              create: [
                { text: "Nucleus", isCorrect: false },
                { text: "Ribosome", isCorrect: false },
                { text: "Mitochondria", isCorrect: true },
                { text: "Golgi apparatus", isCorrect: false }
              ]
            }
          }
        ]
      }
    },
    {
      title: "CAT Quantitative Aptitude",
      description: "Test your mathematical and logical skills for MBA entrance.",
      category: "Management Exams",
      subcategory: "CAT",
      creatorId: user.id,
      timeLimit: 900,
      questions: {
        create: [
          {
            text: "If a train 150m long passes a pole in 15 seconds, what is its speed?",
            options: {
              create: [
                { text: "10 m/s", isCorrect: true },
                { text: "15 m/s", isCorrect: false },
                { text: "20 m/s", isCorrect: false },
                { text: "25 m/s", isCorrect: false }
              ]
            }
          }
        ]
      }
    },
    {
      title: "Class 10 Science Final",
      description: "Physics, Chemistry, and Biology for 10th-grade students.",
      category: "School Level",
      subcategory: "Class 10",
      creatorId: user.id,
      timeLimit: 450,
      questions: {
        create: [
          {
            text: "What is the chemical formula for water?",
            options: {
              create: [
                { text: "CO2", isCorrect: false },
                { text: "H2O", isCorrect: true },
                { text: "O2", isCorrect: false },
                { text: "NaCl", isCorrect: false }
              ]
            }
          }
        ]
      }
    },
    {
      title: "National Current Affairs (2024)",
      description: "Stay updated on recent national news, events, and policies.",
      category: "Current Affairs",
      subcategory: "National",
      creatorId: user.id,
      timeLimit: 300,
      questions: {
        create: [
          {
            text: "Which city is known as the Silicon Valley of India?",
            options: {
              create: [
                { text: "Mumbai", isCorrect: false },
                { text: "Delhi", isCorrect: false },
                { text: "Bengaluru", isCorrect: true },
                { text: "Hyderabad", isCorrect: false }
              ]
            }
          }
        ]
      }
    },
    {
      title: "HR Interview Preparation",
      description: "Common HR questions and the best strategies to answer them.",
      category: "Interview",
      subcategory: "HR Interview",
      creatorId: user.id,
      timeLimit: 300,
      questions: {
        create: [
          {
            text: "Which of the following is considered a 'soft skill'?",
            options: {
              create: [
                { text: "Java Programming", isCorrect: false },
                { text: "Communication", isCorrect: true },
                { text: "Data Analysis", isCorrect: false },
                { text: "Accounting", isCorrect: false }
              ]
            }
          }
        ]
      }
    }
  ];

  for (const quizData of quizzes) {
    const quiz = await prisma.quiz.create({ data: quizData });
    console.log(`Created Quiz: ${quiz.title} (${quiz.category})`);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
