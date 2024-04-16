const ASCIITableDefault = [
    "!", "\"", "#", "$", "%",
    "&", "\'", "(", ")", "*",
    "+", ",", "-", ".", "/",
    "0", "1", "2", "3", "4",
    "5", "6", "7", "8", "9",
    ":", ";", "<", "=", ">",
    "?", "@", "a", "b", "c",
    "d", "e", "f", "g", "h",
    "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w",
    "x", "y", "z", "[", "]",
    "_", "{", "}", "ç", "`",
    "´", "~", "^", " ", "§"
];

function onSubmit(e){
    e.preventDefault();

    let formData = {
        isDefaultAlphabet: document.getElementById('tipo_entrada').checked,
        alphabet: document.getElementById('alfabeto').value,
        isDefaultSeparator: document.getElementById('tipo_separador').checked,
        separator: document.getElementById('separador').value,
        message: document.getElementById('mensagem').value,
        password: document.getElementById('senha').value
    };

    console.log(convertToValidASCIITable(ASCIITableDefault, formData.message));
}


function convertToValidASCIITable(ASCIITable = [], message = ""){
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
                splitString = getLetter.split("");
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