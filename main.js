const game = {
  allLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
  words: ['APPLE', 'BANANA', 'CHERRY', 'DOUGHNUT'],
  guessesRemaining: 1,
  correctGuesses: 0,
  matchedIndexes: [],
  targetWord: 'a',
  lastLetterClicked: 'a',
  setupBoard: function () {
    this.guessesRemaining = 6
    this.correctGuesses = 0
    this.matchedIndexes = []
    this.renderGameBoard()
    this.renderIncorrectGuesses()
    this.randomizeTargetWord()
    this.renderTargetWord()
    this.renderAllLetters()
  },
  renderGameBoard: function () {
    const gameBoard = `
    <div id='targetWord'/>
    <div id='letters'/>
    <div id='guessesRemaining'/>`
    $('#gameBoard').text('').append(gameBoard)
  },
  renderAllLetters: function () {
    $('#letters').text = ''
    this.allLetters.forEach(letter => {
      const letterDiv = `<div class='letter' id=${letter}>${letter}</div>`
      $('#letters').append(letterDiv)
    })
  },
  randomizeTargetWord: function () {
    const randomInt = Math.floor(Math.random() * this.words.length)
    this.targetWord = this.words[randomInt]
    console.log("word: ", this.targetWord)
  },
  renderTargetWord: function () {
    let wordTemplate = ''
    for (let i = 0; i < this.targetWord.length; i++) {
      if (this.matchedIndexes.includes(i)) {
        wordTemplate += this.targetWord[i]
      } else {
        wordTemplate += '_'
      }
    }
    $('#targetWord').text(wordTemplate)
  },
  renderIncorrectGuesses: function () {
    $('#guessesRemaining').text(`Guesses Remaining: ${this.guessesRemaining}`)
  },
  checkForEndGame: function () {
    if (this.correctGuesses >= this.targetWord.length) {
      $('#gameBoard').text("YOU WIN")
    } else if (this.guessesRemaining <= 0) {
      $('#gameBoard').text("GAME OVER")
    }
  },
  handleClickedLetter: function (eventTarget) {
    $(eventTarget).hide()
    this.lastLetterClicked = eventTarget.outerText
    this.findAllInTargetWord()
    this.checkForEndGame()
    this.renderIncorrectGuesses()
  },
  findAllInTargetWord: function () {
    let lastIndexClicked = -1
    let firstIteration = true
    do {
      const indexClicked = this.targetWord.indexOf(this.lastLetterClicked, lastIndexClicked + 1)
      lastIndexClicked = indexClicked

      if (indexClicked >= 0) {
        this.matchedIndexes.push(indexClicked)
        this.correctGuesses++
        this.renderTargetWord()
      } else if (firstIteration) {
        this.guessesRemaining--
      }
      firstIteration = false
    } while (lastIndexClicked >= 0)
  }
}

$(() => {
  game.setupBoard()
  $('#gameBoard').on('click', '#letters', ($event) => {
    game.handleClickedLetter($event.target)
  })
  $('#reset').on('click', () => {
    game.setupBoard()
  })
})