const mongoose=require("mongoose")
const Options = require('./Options');
const schema={
    question: {
        type: String,
        required: true
      },
      options: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Options'
        }
      ]
}

const QuestionSchema=new mongoose.Schema(schema);
const Questions = mongoose.model('Questions', QuestionSchema);
module.exports=Questions;