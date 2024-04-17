import { ConvertToValidASCIITable } from "./src/GenericEncripter.js";

const encrypterForm = document.getElementById("encriptador_form");
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

    console.log(ConvertToValidASCIITable(ASCIITableDefault, formData.message));
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



