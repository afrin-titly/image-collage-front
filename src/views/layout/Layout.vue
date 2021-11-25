<template>
    <div>
        <SideBar/>
        <router-view :key="$router.fullPath"></router-view>
    </div>
</template>

<script>
    import SideBar from '../../components/Sidebar.vue'
    export default {
        components: {
            SideBar
        }
    }
</script>

<style scoped>

</style>