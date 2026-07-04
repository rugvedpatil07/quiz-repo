import { prisma } from '../src/lib/prisma';
import { categoriesData } from '../src/data/categories';

async function main() {
  console.log('Seeding the database with one quiz per EVERY subcategory...');

  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: { name: 'System Admin', email: 'admin@quizmaster.com', password: 'hashed_password_placeholder' }
    });
  }

  let totalQuizzes = 0;

  for (const [category, subcategories] of Object.entries(categoriesData)) {
    if (subcategories.length === 0) continue; // Skip Blog, Ask Question

    for (const subcategory of subcategories) {
      // Create a generic quiz for this subcategory
      const quiz = await prisma.quiz.create({
        data: {
          title: `${subcategory} Mastery Test`,
          description: `Test your fundamental knowledge and advanced skills in ${subcategory}.`,
          category: category,
          subcategory: subcategory,
          creatorId: user.id,
          timeLimit: 300,
          questions: {
            create: [
              {
                text: `Which of the following best describes the core focus of ${subcategory}?`,
                options: {
                  create: [
                    { text: `Advanced concepts in ${subcategory}`, isCorrect: true },
                    { text: `Irrelevant topic A`, isCorrect: false },
                    { text: `Irrelevant topic B`, isCorrect: false },
                    { text: `None of the above`, isCorrect: false }
                  ]
                }
              },
              {
                text: `What is a common application or use case of ${subcategory}?`,
                options: {
                  create: [
                    { text: `Solving complex problems in the field`, isCorrect: true },
                    { text: `Baking a cake`, isCorrect: false },
                    { text: `Driving a car`, isCorrect: false },
                    { text: `Painting a house`, isCorrect: false }
                  ]
                }
              }
            ]
          }
        }
      });
      console.log(`Created Quiz: ${quiz.title} (${category} > ${subcategory})`);
      totalQuizzes++;
    }
  }

  console.log(`\nSeeding completed successfully! Added ${totalQuizzes} new quizzes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
