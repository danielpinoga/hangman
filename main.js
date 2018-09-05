const letterArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
const words = ['xtnvk']
let guessesRemaining = 6
let correctGuesses = 0
let matchedIndexes = []
let targetWord = ''

$(() => {
  targetWord = words[0]
  console.log("word: ", targetWord)

  setupBoard()

  //letter click event
  $('#letters').on('click', ($event) => {
    $($event.target).hide()
    const letterClicked = $event.target.outerText.toLowerCase()
    let lastIndexClicked = -1
    let firstIteration = true
    do {
      const indexClicked = targetWord.indexOf(letterClicked, lastIndexClicked + 1)
      lastIndexClicked = indexClicked

      if (indexClicked >= 0) {
        matchedIndexes.push(indexClicked)
        correctGuesses++
        updateTargetWord()
      } else if (firstIteration) {
        guessesRemaining--
      }
      firstIteration = false
    } while (lastIndexClicked >= 0)

    updateGuesses()
  })
})

const setupBoard = () => {
  resetGuesses()
  resetTargetWord()
  resetLetters()
}

const resetLetters = () => {
  $('#letters').text = ''
  letterArray.forEach(letter => {
    const letterDiv = `<div class='letter' id=${letter}>${letter}</div>`
    $('#letters').append(letterDiv)
  })
}

const resetTargetWord = () => {
  const randomInt = Math.floor(Math.random() * words.length)
  targetWord = words[randomInt]
  updateTargetWord()
}
const updateTargetWord = () => {
  let wordTemplate = ''
  for (let i = 0; i < targetWord.length; i++) {
    if (matchedIndexes.includes(i)) {
      wordTemplate += targetWord[i]
    } else {
      wordTemplate += '_'
    }
  }
  $('#targetWord').text(wordTemplate)
}

const resetGuesses = () => {
  guessesRemaining = 6
  updateGuesses()
}

const updateGuesses = () => {
  if (correctGuesses >= targetWord.length) {
    $('body').text("YOU WIN")
  } else if (guessesRemaining > 0) {
    $('#guessesRemaining').text(`Guesses Remaining: ${guessesRemaining}`)
  } else {
    $('body').text("GAME OVER")
  }
}