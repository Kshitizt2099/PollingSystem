const Questions = require("../model/Question");
const Options = require('../model/Options');
const { options } = require("../routes/routes");
// Viewing Question
module.exports.question = (req, res) => {
    const questionId = req.params.questionId;
    Questions.findById(questionId)
      .populate("options")
      .then(question => {
        if (question) {
          res.status(200).json(question);
        } else {
          res.status(404).json({ message: "Question Not Found!" });
        }
      })
      .catch(err => {
        console.log("Error finding Question!", err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  };
  


// Creating Questions
module.exports.create = (req,res)=>{
    console.log("Create Question!",req.body);
    Questions.create({
        question: req.body.question
    })
    .then(question=>{
        if(question){
            console.log("Successfully created Question!!");
        res.status(200).json({message: "Successfully created Question!", question})
        }
        else{
            console.log("Error creating Question!!");
        res.status(404).json({message: "Couldn't Create Question!"})
        }
    })
    .catch(err=>{
        console.log("Internal Server Error!", err);
        res.status(500).json({message: "Internal Server Error!"})
    })
}

//Deleting the question  
  


module.exports.delete = (req, res) => {
  const questionId = req.params.questionId;

  Questions.findById(questionId).populate("options").then(question => {
      if (!question) {
          return res.status(404).json({ message: 'Question Not Found!' });
      }
      
      const hasVotes = question.options.some(option => option.votes > 0);
      console.log("Has votes", hasVotes);
      
      if (hasVotes) {
          return res.status(400).json({ message: 'Cannot delete question with options having votes' });
      }
      
      // Delete associated options
      return Options.deleteMany({ _id: { $in: question.options } }).then(() => {
          // Delete the question
          return Questions.deleteOne({ _id: questionId }).then(() => {
              return res.status(200).json({ message: 'Successfully Deleted Question!!' });
          });
      });
  }).catch(err => {
      console.log('Error deleting question', err);
      return res.status(500).json({ message: 'Error deleting question' });
  });
};
  

