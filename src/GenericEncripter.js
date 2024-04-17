export function ConvertToValidASCIITable(ASCIITable = [], message = ""){
    let convertedMsg = [];

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