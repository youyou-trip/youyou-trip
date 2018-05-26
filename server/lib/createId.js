function createId(){
    let randomLists = "ABCDE456789";
    let id = '';
    function randomChar() {
        return randomLists.charAt(Math.floor(Math.random() * randomLists.length));
    }
    // 生成8位随机字符
    for(let i = 0;i < 8; i++) {
        id += randomChar();
    }
    return id;
}
module.exports = createId