const fetch = require('node-fetch');

async function run() {
  console.log("Creating quiz...");
  const fs = require('fs');
  const path = require('path');
  
  const dbPath = path.resolve(process.cwd(), 'mock-db.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  const qId = Math.floor(Math.random() * 100000);
  const oId1 = Math.floor(Math.random() * 100000);
  const oId2 = Math.floor(Math.random() * 100000);
  
  const newQuiz = {
    id: Date.now(),
    title: "Test Verification Quiz",
    description: "Testing end to end flow",
    questions: [
      {
        id: qId,
        text: "What is 1+1?",
        options: [
          { id: oId1, text: "2", isCorrect: true },
          { id: oId2, text: "3", isCorrect: false }
        ]
      }
    ],
    creatorId: "mock-id-123",
    creator: { name: "System" },
    _count: { questions: 1 }
  };
  
  if (!db.quizzes) db.quizzes = [];
  db.quizzes.push(newQuiz);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log("Quiz created with ID:", newQuiz.id);
  console.log("Verification of file updates complete. DB saved.");
}
run();
