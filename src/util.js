export function getLetters(string = "", primarySeparator, separators = []){
    const arrayRawLetters = string.split(primarySeparator);

    return arrayRawLetters.map((value) => {
        return value.substring(value.indexOf(separators[0]) + 1, 
                        value.lastIndexOf(separators[1])
                    );
    })
}

//Fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Iterators_and_generators
export function makeIterator (array){
    let nextIndex = 0;
  
    return {
      next: () => {
        return nextIndex < array.length
          ? { value: array[nextIndex++]}
          : undefined;
      },
    };
}