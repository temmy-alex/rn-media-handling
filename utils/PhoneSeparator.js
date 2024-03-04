
function phoneInputForm(input){
    return input?.replace(/[^0-9]/g, '');
} 

function phoneTextFormat(input){
    const joined = phoneInputForm(input);
    return joined?.match(/.{1,4}/g)?.join("-") || ''
}

function phoneFormat(input){
    return input?.match(/.{1,4}/g)?.join("-") || ''
}

function phoneFormatSpace(input){
    return input?.match(/.{1,4}/g)?.join(" ") || ''
}

function removeStripNumber(input){
    return input.replace(/-/g, '');
}

function phoneMasking(input){
    const firstTwoDigits = input.slice(0,2);
    const lastTwoDigits = input.slice(-2);
    const totalLength = input.length - 4;

    let masked = '';

    for(let i = 0; i < totalLength; i++){
        masked += 'x'
    }

    return `${firstTwoDigits}${masked}${lastTwoDigits}`;
}

function phoneForgotMasking(input){
    const lastTwoDigits = input.slice(-3);
    const totalLength = input.length - 3;

    let masked = '';

    for(let i = 0; i < totalLength; i++){
        masked += '*'
    }

    return `${masked}${lastTwoDigits}`;
}

export {
    phoneInputForm,
    phoneTextFormat,
    phoneFormat,
    removeStripNumber,
    phoneMasking,
    phoneForgotMasking,
    phoneFormatSpace
}