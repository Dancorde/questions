const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Question {
    _id: ID!
    problem: String!
    answer1: String!
    answer2: String!
    answer3: String!
    answer4: String!
    answer5: String!
  }

  input QuestionInput {
    problem: String!
    answer1: String!
    answer2: String!
    answer3: String!
    answer4: String!
    answer5: String!
  }

  type RootQuery {
    questions: [Question!]!
  }
  type RootMutation {
    createQuestion(questionInput: QuestionInput!): Question
    updateQuestion(questionId: ID!, questionInput: QuestionInput!): Question
    deleteQuestion(questionId: ID!): Question
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
