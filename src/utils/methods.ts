import { type Country } from '../data';

export function shuffle(array: Country[]) {
    let index = array.length;
    let random = 0;
    let temp = array[0];
    while (--index > 0) {
        random = Math.floor(Math.random() * (index + 1));
        temp = array[random];
        array[random] = array[index];
        array[index] = temp;
    }
    return array;
}

export function disableOption(option: string) {
    document.getElementById(option)?.classList.add('option--disabled');
}

export function enableOptions() {
    const options = document.getElementsByClassName('option--disabled');
    for (const option of options) {
        option.classList.remove('option--disabled');
    }
}
