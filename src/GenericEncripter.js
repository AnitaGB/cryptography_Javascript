import { makeIterator } from "./util.js";

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
                case char.toUpperCase():
                    convertedMsg.push("§");
                    break;
            }
            let getLetter = char.toLowerCase().normalize("NFD");

            if(getLetter.length > 1){
                let splitString = getLetter.split("");
                getLetter = splitString.reverse();
                switch (getLetter[0].charCodeAt(0)){
                    case 768:
                        getLetter[0] = "`";
                        break;
                    case 769:
                        getLetter[0] = "´";
                        break;
                    case 770:
                        getLetter[0] = "^";
                        break;
                    case 771:
                        getLetter[0] = "~"
                        break;
                }
            }
            convertedMsg.push(getLetter[0], getLetter[1]);
        }
    }

    return convertedMsg;
}

export function generateTape70(ASCIITable = [], units = []){
    const tape70 = [];

    const symbolsCount = units.slice();
    const symbolsPairs = [];
    const symbols2Combined = [];
    const symbols3Combined = [];
    for (let i in units){
        const v = units[i];
        symbolsPairs.push(v + "+" + v);
        for(let j in units){
            const w = units[j];
            v!== w && symbols2Combined.push(v + "+" + w);
            for (let k in units) {
                const x = units[k];
                if (!([v,w].includes(x)) && !([x,w].includes(v))){
                    symbols3Combined.push(v + "+" + w + "+" + x);
                }    
            }
        } 
    }

    const sc = makeIterator(symbolsCount);
    const sp = makeIterator(symbolsPairs);
    const s2c = makeIterator(symbols2Combined);
    const s3c = makeIterator(symbols3Combined);

    while (tape70.length < ASCIITable.length){
        try {
            tape70.push(sc.next().value);
        } catch (stopIteration){
            try {
                tape70.push(sp.next().value);
            } catch (stopIteration){
                try {
                    tape70.push(s2c.next().value);
                } catch (stopIteration){
                    try {
                        tape70.push(s3c.next().value);
                    } catch (stopIteration){
                        break;
                    }
                } 
            }
        }
    }

    return tape70;
}