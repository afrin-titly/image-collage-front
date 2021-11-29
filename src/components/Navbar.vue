<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
            <a class="navbar-brand" href="#">Image Collage</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto ">
                <li class="nav-item active">
                    <a class="nav-link" href="" @click="logout"> Logout </a>
                </li>
                </ul>
            </div>
        </nav>

    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import router from '../router/index.js'
    export default {
        methods: {
            logout() {
                Cookies.remove('token')
                router.push({path: "/login"})
            }
        }
    }
</script>

<style scoped>

</style>