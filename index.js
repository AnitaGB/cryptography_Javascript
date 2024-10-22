import { alphabetMatch, ConvertToValidASCIITable, encodeCSG, decodeCSG } from "./src/GenericEncripter.js";

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

const alphabets = {
    emojis: {
        separator: "😌",
        caracters: ["😂", "🤪", "😗", "🤨", "💀", "😃", "😑"]
    },
    musical_notes: {
        separator: "A",
        caracters: ["C", "D", "E", "F", "G", "B"]
    },
    letters: {
        separator: "e",
        caracters: ["a", "b", "c", "d", "f"]
    },
    numbers: {
        separator: "6",
        caracters: ["1", "2", "3", "4", "5", "7"]
    }
}

const encrypterForm = document.getElementById("encriptador_form");

const decrypterForm = document.getElementById("decriptador_form");


encrypterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = {
        alphabet: document.getElementById('alfabeto').value,
        message: document.getElementById('mensagem').value,
        password: document.getElementById('senha').value
    };

    const alphabet = alphabets[formData.alphabet].caracters;
    const separator = alphabets[formData.alphabet].separator;

    encryptMsg(ASCIITableDefault, alphabet, formData.message, formData.password, separator);
});

decrypterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = {
        alphabet: document.getElementById('alfabeto-d').value,
        message: document.getElementById('mensagem-d').value,
        password: document.getElementById('senha-d').value
    };

    const alphabet = alphabets[formData.alphabet].caracters;
    const separator = alphabets[formData.alphabet].separator;

    decryptMsg(ASCIITableDefault, alphabet, formData.message, formData.password, separator);
});

function encryptMsg(ASCIITable, alphabet, message, passwordValid, separator){
    console.log(separator);
    const tape70 = alphabetMatch(ASCIITable, alphabet);
    const validMessage = ConvertToValidASCIITable(ASCIITable, message);
    const finalMessageStr = encodeCSG(tape70, validMessage, passwordValid, separator);

    document.getElementById('resultado-encriptador').innerText = finalMessageStr;
}

function decryptMsg(ASCIITable, alphabet, message, passwordValid, separator){
    console.log(separator);
    const tape70 = alphabetMatch(ASCIITable, alphabet);
    const finalMessageStr = decodeCSG(tape70, message, passwordValid, separator);

    document.getElementById('resultado-decriptador').innerText = finalMessageStr;
}
