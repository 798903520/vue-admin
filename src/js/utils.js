let utils = {
    get_random_num(min,max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
export {utils}
