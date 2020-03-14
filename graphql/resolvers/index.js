const Question = require("../../models/question");
const Alternative = require("../../models/alternative");

const alternatives = async questionId => {
  try {
    const alternatives = await Alternative.find({ question: questionId });
    return alternatives.map(alternative => {
      return {
        ...alternative._doc,
        _id: alternative.id,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  questions: async () => {
    try {
      const questions = await Question.find({});
      return questions.map(question => {
        return {
          ...question._doc,
          _id: question.id,
          alternatives: alternatives.bind(this, question.id),
        };
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createQuestion: async args => {
    const question = new Question({
      problem: args.questionInput.problem,
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
  updateQuestion: async args => {
    try {
      const result = await Question.findOneAndUpdate(
        { _id: args.questionId },
        {
          $set: {
            problem: args.questionInput.problem,
          },
        }
      );
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteQuestion: async args => {
    try {
      const question = await Question.findById(args.questionId);
      await Question.deleteOne({ _id: args.questionId });
      return question;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  addAlternative: async args => {
    const alternative = new Alternative({
      answer: args.alternativeInput.answer,
      question: args.questionId,
    });
    try {
      const result = await alternative.save();
      const question = await Question.findById(args.questionId);

      if (!question) {
        throw new Error("Question not found!");
      }
      console.log(question);

      question.alternatives.push(alternative);
      await question.save();

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateAlternative: async args => {
    try {
      const result = await Alternative.findOneAndUpdate(
        { _id: args.alternativeId },
        {
          $set: {
            answer: args.alternativeInput.answer,
          },
        }
      );
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  removeAlternative: async args => {
    try {
      const alternative = await Alternative.findById(args.alternativeId);
      await Alternative.deleteOne({ _id: args.alternativeId });
      return alternative;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
