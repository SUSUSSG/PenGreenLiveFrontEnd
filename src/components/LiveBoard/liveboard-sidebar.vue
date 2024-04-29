<template>
    <div class="bg-white rounded pt-3 px-4 mt-4 ml-5" id="sidebar">
        <div class="grid gap-8 mt-5" style="grid-template-rows: repeat(6, 1fr);">
            <div class="grid gap-8 mt-5" style="grid-template-rows: repeat(6, 1fr);">

                <div class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black cursor-pointer"
                    @click="toggleIcon(statistics[0])">
                    <Icon :icon="statistics[0].isActive ? statistics[0].activeIcon : statistics[0].icon"></Icon>
                </div>

                <div class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black cursor-pointer"
                    @click="toggleIcon(statistics[1])">
                    <Icon :icon="statistics[1].isActive ? statistics[1].activeIcon : statistics[1].icon"></Icon>
                </div>

                <div class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black cursor-pointer"
                     @click="toggleIcon(statistics[2]); broadcastDeviceControl()">
                    <Icon :icon="statistics[2].icon"></Icon>
                    <Modal title="방송 기기 설정" ref="broadcastDeviceControl" :showButtons="false">
                    </Modal>
                </div>

                <div class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black cursor-pointer"
                    @click="toggleIcon(statistics[3]); editBroadcastInfo()">
                    <Icon :icon="statistics[3].icon"></Icon>
                    <Modal title="방송 정보 편집" ref="editBroadcastInfo" :showButtons="false">
                    </Modal>
                </div>

                <div class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black cursor-pointer"
                    @click="toggleIcon(statistics[4]); addNotice()">
                    <Icon :icon="statistics[4].icon"></Icon>
                    <Modal title="공지사항 등록" ref="addNotice" :showButtons="false">
                    </Modal>
                </div>

                <div class="mx-auto h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mb-4 black cursor-pointer"
                    @click="toggleIcon(statistics[5]); addFaQ()">
                    <Icon :icon="statistics[5].icon"></Icon>
                    <Modal title="자주 묻는 질문 등록" ref="addFaQ" :showButtons="false">
                    </Modal>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from "@/components/Icon";
import Modal from "../Modal/Modal.vue";

export default {
    components: {
        Icon,
        Modal
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
                    // activeIcon: "material-symbols:settings-video-camera-sharp",
                    // isActive: false
                },
                {
                    icon: "material-symbols:app-registration",
                    // activeIcon: "material-symbols:app-registration",
                    // isActive: false
                },
                {
                    icon: "material-symbols:campaign-rounded",
                    // activeIcon: "material-symbols:campaign-rounded",
                    // isActive: false
                },
                {
                    icon: "material-symbols:maps-ugc-rounded",
                    // activeIcon: "material-symbols:maps-ugc-rounded",
                    // isActive: false
                },
            ]
        }
    },
    methods: {
        toggleIcon(item) {
            item.isActive = !item.isActive;
        },
        broadcastDeviceControl() {
            this.isOpen = true;
            this.$refs.broadcastDeviceControl.openModal();
        },
        editBroadcastInfo() {
            this.isOpen = true;
            this.$refs.editBroadcastInfo.openModal();
        },
        addNotice() {
            this.isOpen = true;
            this.$refs.addNotice.openModal();
        },
        addFaQ() {
            this.isOpen = true;
            this.$refs.addFaQ.openModal();
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