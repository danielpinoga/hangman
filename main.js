$(() => {
  console.log("JS file starting")
  const letterArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

  letterArray.forEach(letter => {
    const letterDiv = `<div class='letter' id=${letter}>${letter}</div>`
    $('#letters').append(letterDiv)

  })
})