const DataLoader = require("dataloader");

const Question = require("../../models/question");

const questionLoader = new DataLoader(questionsIds => {});

module.exports = {
  questions: async () => {
    try {
      const questions = await Question.find({});
      return questions.map(question => {
        return { ...question._doc, _id: question.id };
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createQuestion: async args => {
    const question = new Question({
      problem: args.questionInput.problem,
      answer1: args.questionInput.answer1,
      answer2: args.questionInput.answer2,
      answer3: args.questionInput.answer3,
      answer4: args.questionInput.answer4,
      answer5: args.questionInput.answer5
    });
    try {
      const result = await question.save();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteQuestion: async args => {
    try {
      const question = await await Question.findById(args.questionId);
      await Question.deleteOne({ _id: args.questionId });
      return question;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
