
export function trans(sentence: string): string {
    
    let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", 'q', 'r', 's', 't', "u", 'v', 'w', 'x', 'y', 'z']
    let transWord = ["ᚫ", 'ᛒ', 'ᚲ', 'ᛞ', 'ᛖ', 'ᚠ', 'ᚷ', 'ᚺ', 'ᛁ', 'ᛃ', 'ᚲ', 'ᛚ', 'ᛗ', 'ᚾ', 'ᛟ', 'ᛈ', 'ᚦ', 'ᚱ','ᛊ','ᛏ','ᚢ','ᛇ','ᚹ','ᛜ','ᛝ','ᛉ']

    let newSentence = ""

    for (let i=0; i < sentence.length; i++) {
      let x = sentence.split("")[i]
      let y = alphabet.indexOf(x)

      if (alphabet.indexOf(x) !== -1 ) {
        newSentence += transWord[y]
      } else {
          newSentence += x
      }

    }

    return newSentence
}