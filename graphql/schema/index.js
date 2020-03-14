const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Question {
    _id: ID!
    problem: String!
    alternatives: [Alternative!]
  }

  type Alternative {
    _id: ID!
    answer: String!
    question: Question!
  }

  input QuestionInput {
    problem: String!
  }

  input AlternativeInput {
    answer: String!
  }

  type RootQuery {
    questions: [Question!]!
    alternatives(questionId: ID!): [Alternative!]!
  }
  type RootMutation {
    createQuestion(questionInput: QuestionInput!): Question
    updateQuestion(questionId: ID!, questionInput: QuestionInput!): Question
    deleteQuestion(questionId: ID!): Question
    addAlternative(questionId: ID!, alternativeInput: AlternativeInput!): Alternative
    updateAlternative(alternativeId: ID!, alternativeInput: AlternativeInput!): Alternative
    removeAlternative(alternativeId: ID): Alternative
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
