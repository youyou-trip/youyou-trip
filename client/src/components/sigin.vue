<template>
    <div class="sigin">
        <div class="box">
            <div>
                <span>用户名:</span>
                <input type="text">
            </div>
            <div>
                <span>昵称:</span>
                <input type="type">
            </div>
            <div>
                <span>密码:</span>
                <input type="password">
            </div>
        </div>
        <button>注册</button>
    </div>
</template>
<style lang="stylus" scoped>
.sigin
  height: 40rem
  .box
    div
      padding: 10px 20px
      span
        display: inline-block
        width: 4rem
  button
    margin: 2rem
    width: 4rem
    height: 2rem
    background: #333
    border: none
    color: #fff
    border-radius: 3px
    cursor: pointer
</style>
