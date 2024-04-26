<template>
    <div class="bg-white rounded pt-3 px-4 mt-4 ml-5" id="sidebar">
        <div class="grid gap-8 mt-5" style="grid-template-rows: repeat(6, 1fr);">
            <div v-for="(item, i) in statistics" :key="i"
                class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black"
                v-on:click="toggleIcon(item)">
                <Icon :icon="item.isActive ? item.activeIcon : item.icon"></Icon>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from "@/components/Icon"
export default {
    components: {
        Icon
    },
    data() {
        return {
            statistics: [
                {
                    icon: "material-symbols:hangout-video",
                    activeIcon: "material-symbols:hangout-video-off",
                    isActive: false
                },
                {
                    icon: "material-symbols:mic",
                    activeIcon: "material-symbols:mic-off",
                    isActive: false
                },
                {
                    icon: "material-symbols:settings-video-camera-sharp",
                    activeIcon: "material-symbols:settings-video-camera-sharp",
                    isActive: false
                },
                {
                    icon: "material-symbols:app-registration",
                    activeIcon: "material-symbols:app-registration",
                    isActive: false
                },
                {
                    icon: "material-symbols:campaign-rounded",
                    activeIcon: "material-symbols:campaign-rounded",
                    isActive: false
                },
                {
                    icon: "material-symbols:maps-ugc-rounded",
                    activeIcon: "material-symbols:maps-ugc-rounded",
                    isActive: false
                },
            ]
        }
    },
    methods: {
        toggleIcon(item) {
            item.isActive = !item.isActive;
        }
    }
}
</script>

<style>
#sidebar {
    width: 70px;
    height: 550px;
    margin-top: 100px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    background: white;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}
</style>