const letterArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
const words = ['world']
let guessesRemaining = 6

$(() => {
  console.log("JS file starting")
  let targetWord = words[0]
  console.log("word: ", targetWord)

  setupBoard(targetWord)

  $('#letters').on('click', ($event) => {
    const clickedDiv = $event.target
    const letterClicked = $event.target.outerText.toLowerCase()
    $(clickedDiv).hide()
    if (targetWord.includes(letterClicked)) {
      console.log("GOTEM")
    } else {
      guessesRemaining--
    }

    updateGuesses()
  })
})

const setupBoard = (targetWord) => {
  updateGuesses()

  let wordTemplate = ''
  for (let i = 0; i < targetWord.length; i++) {
    wordTemplate += '_ '
  }
  updateTargetWord(wordTemplate)

  letterArray.forEach(letter => {
    const letterDiv = `<div class='letter' id=${letter}>${letter}</div>`
    $('#letters').append(letterDiv)
  })
}

const updateTargetWord = (targetWord) => {
  $('#targetWord').text(targetWord)
}

const updateGuesses = () => {
  if (guessesRemaining > 0) {
    $('#guessesRemaining').text(`Guesses Remaining: ${guessesRemaining}`)
  } else {
    $('body').text("GAME OVER")
  }
}