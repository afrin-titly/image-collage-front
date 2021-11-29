<template>
    <div>
        <Navbar/>
        <SideBar/>
        <router-view :key="$router.fullPath"></router-view>
    </div>
</template>

<script>
    import SideBar from '../../components/Sidebar.vue'
    import Navbar from '../../components/Navbar.vue'
    export default {
        components: {
            SideBar,
            Navbar,
        }
    }
</script>

<style scoped>

</style>