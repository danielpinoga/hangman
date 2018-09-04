const letterArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
const words = ['world']
let guessesRemaining = 6
let correctGuesses = 0
let wordTemplate = ''
let targetWord = ''

$(() => {
  console.log("JS file starting")
  targetWord = words[0]
  console.log("word: ", targetWord)

  // board setup
  updateGuesses()
  for (let i = 0; i < targetWord.length; i++) {
    wordTemplate += '_'
  }
  updateTargetWord(wordTemplate)
  letterArray.forEach(letter => {
    const letterDiv = `<div class='letter' id=${letter}>${letter}</div>`
    $('#letters').append(letterDiv)
  })

  //letter click event
  $('#letters').on('click', ($event) => {
    $($event.target).hide()
    const letterClicked = $event.target.outerText.toLowerCase()
    const indexClicked = targetWord.indexOf(letterClicked)
    if (indexClicked >= 0) {
      console.log("Matched")
      correctGuesses++
    } else {
      console.log("Missed")
      guessesRemaining--
    }
    updateGuesses()
  })
})

const updateTargetWord = () => {
  $('#targetWord').text(wordTemplate)
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