const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Subject = require('./models/Subject');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedSubjects = async () => {
  await connectDB();

  const subjects = [
    {
      name: 'Reinforcement Learning',
      code: 'RL',
      description: 'Study of decision making and optimal control',
      order: 1,
    },
    {
      name: 'Data Visualization',
      code: 'DV',
      description: 'Graphical representation of information and data',
      order: 2,
    },
    {
      name: 'Big Data Analysis',
      code: 'BD',
      description: 'Complex data sets and analytical methods',
      order: 3,
    },
    {
      name: 'Cloud Computing',
      code: 'CC',
      description: 'On-demand computer system resources',
      order: 4,
    },
    {
      name: 'Software Engineering',
      code: 'SE',
      description: 'Systematic application of engineering to software',
      order: 5,
    },
    {
      name: 'Generative AI',
      code: 'GEN-AI',
      description: 'Creating new content using machine learning models',
      order: 6,
    },
    {
      name: 'DevOps',
      code: 'DEVOPS',
      description: 'Practices combining software development and IT operations',
      order: 7,
    },
  ];

  try {
    for (const subject of subjects) {
      const subjectExists = await Subject.findOne({ code: subject.code });
      if (!subjectExists) {
        await Subject.create(subject);
        console.log(`Added subject: ${subject.name}`);
      } else {
        console.log(`Subject already exists: ${subject.name}`);
      }
    }
    console.log('Seeding Completed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedSubjects();
