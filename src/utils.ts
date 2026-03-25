const kaomojis = [
  "(｡•ᴗ•｡)",
  "(≧◡≦)",
  "ヽ(・∀・)ﾉ",
  "≧☉_☉≦",
  "(o^▽^o)",
  "<(￣︶￣)>",
  "(＠＾◡＾)",
  "ヽ(*⌒▽⌒*)ﾉ",
  "(๑˃ᴗ˂)ﻭ",
  "(づ￣ ³￣)づ",
  "(b ᵔ▽ᵔ)b",
  "≽^•⩊•^≼",
  "(♡°▽°♡)",
  "(╥﹏╥)",
  "∪＾ェ＾∪",
  "ヽ(￣(ｴ)￣)ﾉ",
  "(｡•̀ᴗ-)✧",
  "(－ω－) zzZ",
]

export function getTimeDiffernceFromNow(timeInMilliseconds: number) {
  const msDiff = new Date().getTime() - timeInMilliseconds
  const timeDiff = new Date(msDiff).toISOString().slice(11, 19)
  return timeDiff
}

export function generateCardMatrix(size: number) {
  const cards = []
  // shuffleHelper will place 2d array into 1d array, which is easier to shuffle
  const shuffleHelper = []

  for (let i = 0, k = 0, count = 0; i < size; i++) {
    const row = []
    for (let j = 0; j < size; j++, count++) {
      shuffleHelper.push([i, j])
      if (count === 2) {
        // once an emoji is used two times we move forward to use next one
        count = 0
        k++
      }
      row.push({ show: false, matched: false, content: kaomojis[k] })
    }
    cards.push(row)
  }

  // shuffling content using fisher yates algo
  for (let i = shuffleHelper.length - 1; i > 0; i--) {
    const randomIdx = Math.floor(Math.random() * (i - 1))
    const [rowIdx, colIdx] = shuffleHelper[i]
    const [randomRowIdx, randomColIdx] = shuffleHelper[randomIdx]

    const temp = cards[rowIdx][colIdx]
    cards[rowIdx][colIdx] = cards[randomRowIdx][randomColIdx]
    cards[randomRowIdx][randomColIdx] = temp
  }

  return cards
}
