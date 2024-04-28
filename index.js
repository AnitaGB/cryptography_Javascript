import { ConvertToValidASCIITable, generateTape70, passwordCodeShuffle } from "./src/GenericEncripter.js";
import { getLetters } from "./src/util.js";

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

const encrypterForm = document.getElementById("encriptador_form");

const checkboxAlphabet = document.getElementById("tipo_entrada");
const checkboxSeparator = document.getElementById("tipo_separador");

checkboxAlphabet.addEventListener("change", (e) => {
    const disabled = e.target.checked;
    const alphabet = document.getElementById("alfabeto");
    alphabet.disabled = disabled;
    alphabet.value = "['0', '1', '2', '3', '4', '5', '6']";
});

checkboxSeparator.addEventListener("change", (e) => {
    const disabled = e.target.checked;
    const alphabet = document.getElementById("separador");
    alphabet.disabled = disabled;
    alphabet.value = "&";
});


encrypterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = {
        isDefaultAlphabet: document.getElementById('tipo_entrada').checked,
        alphabet: document.getElementById('alfabeto').value,
        isDefaultSeparator: document.getElementById('tipo_separador').checked,
        separator: document.getElementById('separador').value,
        message: document.getElementById('mensagem').value,
        password: document.getElementById('senha').value,
        passwordCode: document.getElementById('correspSenha').value
    };

    const alphabet = getLetters(formData.alphabet, ",", ["'", "'"]);
    const passwordCode = getLetters(formData.passwordCode, ",", ["'", "'"]);
    encryptMsg(ASCIITableDefault, alphabet, formData.message, formData.password, passwordCode, formData.separator);
});

function encryptMsg(ASCIITable, alphabet, message, passwordValid, passwordCode, separator){
    console.log(separator);
    const tape70 = generateTape70(ASCIITable, alphabet);
    const validMessage = ConvertToValidASCIITable(ASCIITable, message);
    const shuffledAlphabet = passwordCodeShuffle(ASCIITable, tape70, passwordValid, passwordCode);
    const finalMessage = [];
    validMessage.forEach((char) =>{
        finalMessage.push(shuffledAlphabet[char]);
    })

    let finalMessageStr = "";

    finalMessage.forEach((char) => {
        finalMessageStr += separator + char + separator;
    })

    console.log(finalMessage);
    document.getElementById('resultado-encriptador').innerText = finalMessageStr;
}
