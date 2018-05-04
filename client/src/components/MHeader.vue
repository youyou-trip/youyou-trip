<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
            <Icon type="home"></Icon>
            <router-link to="/">youyoutrip</router-link>
        </MenuItem>
        <MenuItem name="2">
            <Icon type="location"></Icon>
            <router-link to="/sign-route">定点规划</router-link>
        </MenuItem>
        <MenuItem name="3">
            <Icon type="map"></Icon>
            <router-link to="/plan-route">多城市规划</router-link>
        </MenuItem>
        <MenuItem name="4">
            <router-link to="/user">
                <div class="demo-avatar">
                    <Avatar>{{user}}</Avatar>
                </div>
            </router-link>
        </MenuItem>
    </Menu>
</template>

<script>
    export default {
        data () {
            return {
                theme1: 'light',
                user: this.$store.getters.getUser ? this.$store.getters.getUser : window.localStorage.getItem('user_id')
            }
        },
        computed: {
            getUser() {
                return this.$store.getters.getUser;
            }
        },
        watch: {
            getUser(val) {
                this.user = val;
            }
        }
    }
</script>


<style lang="stylus">
</style>