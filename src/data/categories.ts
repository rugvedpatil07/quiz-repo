export const categoriesData: Record<string, string[]> = {
  "Competitive Exams": [
    "Aptitude", "English", "Verbal Reasoning", "Non Verbal Reasoning", "GK", "GS", 
    "Computer Fundamentals", "DI", "StateWise GK", "History GK", "Geography GK", 
    "Physics GK", "Chemistry GK", "Biology GK", "Banking Awareness", "UPSC", "SSC", "Railway", "Defence"
  ],
  "Computer": [
    "Computer Fundamentals", "Networking", "SQL", "MySQL", "Database", "Data Science", 
    "Machine Learning", "Cloud Computing", "Artificial Intelligence(AI)", "Operating Systems", 
    "Cyber Security", "Web Technologies"
  ],
  "Engineering & GATE": [
    "Computer Science", "ECE", "Mechanical Engineering", "Civil Engineering", 
    "Electrical Engineering", "Chemical Engineering", "Automobile Engineering", 
    "Biotechnology Engineering", "Mining Engineering", "Geological Engineering", 
    "Metallurgical Engineering", "Engineering Maths", "Engineering Physics", "Engineering Chemistry"
  ],
  "Programming": [
    "Visual Basic", "C Program", "C++ Program", "C# Program", "Java Program", 
    "Ruby Programming", "Data Science", "Python Program", "Cloud Computing", 
    "Machine Learning", "IoT", "HTML", "CSS", "Javascript", "PHP Program", "Hadoop", 
    "R Programming", "Swift", "Kotlin", "Go", "Rust", "Typescript", "React", "Angular", "Vue", "Node.js"
  ],
  "Graduation & PG": [
    "Commerce", "Management", "Law", "Mass Communication", "Political Science", 
    "Sociology", "Psychology", "Agriculture", "Pharmacy", "Home Science", "Philosophy", 
    "Economics", "History", "Literature"
  ],
  "General Knowledge": [
    "Basic GK", "World Geography", "Indian Geography", "Indian History", "World History", 
    "Indian Economy", "Indian Politics", "General Science", "Famous Personalities", "Inventions", 
    "Sports", "Books and Authors", "Awards", "Days and Years"
  ],
  "Medical Exams": [
    "NEET", "AIIMS", "JIPMER", "AFMC", "PGIMER", "CMC Vellore", "AIPVT", "BDS", "Nursing", "Paramedical"
  ],
  "Management Exams": [
    "CAT", "MAT", "XAT", "CMAT", "SNAP", "NMAT", "IIFT", "ATMA", "TANCET", "MAH CET"
  ],
  "School Level": [
    "Class 10", "Class 12", "Class 9", "Class 11", "Class 8", "Class 7", "Class 6", 
    "Olympiad", "NTSE", "CBSE", "ICSE", "State Board"
  ],
  "Current Affairs": [
    "National", "International", "Sports", "Politics", "Economy", "Science & Tech"
  ],
  "Interview": [
    "HR Interview", "Technical Interview", "Group Discussion", "Placement Papers", 
    "Body Language", "Resume Building"
  ],
  "Blog": [],
  "Ask Question": []
};

export const navItems = [
  ...Object.keys(categoriesData).map(cat => ({
    label: cat,
    href: `/quizzes?category=${encodeURIComponent(cat)}`,
    subItems: categoriesData[cat]
  }))
];
