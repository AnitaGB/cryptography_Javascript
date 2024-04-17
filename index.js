import { ConvertToValidASCIITable, generateTape70 } from "./src/GenericEncripter.js";
import { getLetters } from "./src/util.js";

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
        password: document.getElementById('senha').value
    };

    const alphabet = getLetters(formData.alphabet, ",", ["'", "'"]);

    console.log(ConvertToValidASCIITable(ASCIITableDefault, formData.message));
    console.log(generateTape70(ASCIITableDefault, alphabet));
})

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



