<template>
    <div class="popup popup2 popup_center">
        <span class="close_pop" @click="onClose()">×</span>
        <div class="pophead">
            <h2>Danh sách xe</h2>
            <p>Danh sách xe đang hoạt động</p>
        </div>
        <div class="frm check_frm check_frm_search">
            <input type="text" id="txtSeachKeywords" placeholder="Tìm xe..." autocomplete="off">
            <div class="scroll2" style="margin:10px 0 0 0;float:left">
                <p v-for="(item, i) in fillterData" style="width:33.33333333333333%;float:left;clear:none;padding:4px 0" :key="i">
                    <input type="checkbox" v-model="selectedItems[item]" :value=item style="float:left;margin:0 3px 0 0" class="chk_multi" id="ck1">
                    <label style="cursor:pointer">{{item}}
                        <!-- <i class="green">(Xe 2 cầu)</i> -->
                    </label>
                </p>
            </div>
            <button class="checked_tx" style="margin:10px 10px 0 0;float:left" @click="submit">
                <i class="fa fa-plus"></i> Chọn </button>
        </div>
    </div>
</template>
<style scoped>

</style>
<script setup>
import { mapState, mapActions, mapMutations } from "vuex";
</script>
<script>
export default {
    props: ['data', 'selectedKey'],
    emits: ['close', 'onSubmit'],
    data: function () {
        return {
            fillterData: null,
            selectedItems: {},
        }
    },
    methods: {
        submit: function () {
            const selected = Object.keys(this.selectedItems).filter(
                item => this.selectedItems[item]
            );
            console.log('selected:', selected)
            this.$emit('onSubmit', selected);
            this.onClose();
        },
        onClose: function () {
            this.$emit('close', this.reload)
        },
    },
    created: async function () {
        this.fillterData = {...this.data}
    }
}
</script>
