const express = require('express');

const router = express.Router();


// router.use('/questions',  require('./question'))
// router.use('/options', require('./options') )

const questionController = require('../controller/QuestionController')
const optionsController = require('../controller/OptionController')


router.post('/create', questionController.create)
router.get('/:questionId', questionController.question)
router.get('/:questionId/delete' , questionController.delete)
router.post('/:questionId/options/create', optionsController.create )
router.post('/:optionId/add_vote',  optionsController.addVote)
router.get('/:optionId/deleteoption', optionsController.delete)

module.exports = router;