function createId(){
    let randomLists = "ABCDE456789";
    let id = '';
    function randomChar() {
        return randomLists.charAt(Math.floor(Math.random() * randomLists.length));
    }
    // 生成16位随机字符，每4位用 - 连接
    for(let i = 0;i < 4; i++) {
        id += randomChar();
    }
    return id;
}
module.exports = createId