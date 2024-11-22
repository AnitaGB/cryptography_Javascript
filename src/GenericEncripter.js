
export function ConvertToValidASCIITable(ASCIITable = [], message = ""){
    const convertedMsg = [];

    for (let char of message){
        if (ASCIITable.includes(char)){
            convertedMsg.push(char);
        }

        else {
            switch (char){
                case "\t":
                    convertedMsg.push([" ", " "]);
                    break;
                case "\n":
                    convertedMsg.push([" ", " ", " "]);
                    break;
            }
            let getLetter = char.toLowerCase().normalize("NFD");

            if(getLetter.length > 1){
                let splitString = getLetter.split("");
                getLetter = splitString[0];
            }
            convertedMsg.push(...getLetter);
        }
    }

    return convertedMsg;
}

export function alphabetMatch (baseAlphabet, symbolsList) {
    let alphabetMatch = {}; for (let char of baseAlphabet) alphabetMatch[char] = null
    let prevChar = null

    symbolsList.forEach(newChar => {
        for (let i = 0; i < baseAlphabet.length; i++) {
            if (alphabetMatch[baseAlphabet[i]] == null)
                alphabetMatch[baseAlphabet[i]] = String(newChar.repeat(i + 1))
            else
                alphabetMatch[baseAlphabet[i]] = alphabetMatch[baseAlphabet[i]].replaceAll(prevChar.repeat(2), newChar)
        }
        prevChar = newChar
    })
    return alphabetMatch
}

//Basic second order encryption of periods opposed by key
export function encodeCSG (baseAlphabetMatch, msg, password, spacer = '&') {
    const baseAlphabet = Object.keys(baseAlphabetMatch)
    let symbolsOrder = baseAlphabet.map(key => { return baseAlphabetMatch[key] })
    let msgEncoded = Array()

    for (let i = 0; i < password.length; i++) {
        let posInA = baseAlphabet.indexOf(password[i]) //Position in base Alphabet
        //Invert position of periods [posInA ... end] and [start ... posInA]
        symbolsOrder = symbolsOrder.slice(posInA).reverse().concat(symbolsOrder.slice(0, posInA))
    }
    let finalAlphabetMatch = {}; for (let i = 0; i < baseAlphabet.length; i++) finalAlphabetMatch[baseAlphabet[i]] = symbolsOrder[i]

    for (let i = 0; i < msg.length; i++) {
        msgEncoded.push(finalAlphabetMatch[msg[i]] + spacer)
    }
    return msgEncoded.join('')
}

export function decodeCSG (baseAlphabetMatch, msg, password, spacer){
    const baseAlphabet = Object.keys(baseAlphabetMatch)
    let symbolsOrder = baseAlphabet.map(key => { return baseAlphabetMatch[key] })
    let msgDecoded = Array()

    for (let i = 0; i < password.length; i++) {
        let posInA = baseAlphabet.indexOf(password[i]) //Position in base Alphabet
        //Invert position of periods [posInA ... end] and [start ... posInA]
        symbolsOrder = symbolsOrder.slice(posInA).reverse().concat(symbolsOrder.slice(0, posInA))
    }
    let finalAlphabetMatch = {}; for (let i = 0; i < baseAlphabet.length; i++) finalAlphabetMatch[symbolsOrder[i]] = baseAlphabet[i]

    msg = msg.split(spacer)
    for (let i = 0; i < msg.length; i++) {
        if (msg[i] != '')
            msgDecoded.push(finalAlphabetMatch[msg[i]])
    }
    return msgDecoded.join('')
}