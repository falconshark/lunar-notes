<template>
    <div class="latest-notes-wrapper">
        <h2 class="page-subheader">
            Latest Notes
        </h2>
    </div>
</template>
    
<script>
import { mapState } from 'pinia';
import { useStorageStore } from '@/stores/storage';
import Storage from '@/lib/Storage';

export default {
    name: 'LatestNotes',
    mounted(){
        this.loadStorageContent();
    },
    methods: {
        loadStorageContent(){
            if(this.dropboxAccessToken){
                //const notes = Storage.loadDropboxContent(this.dropboxAccessToken);
            }
        },
    },
    computed: {
        ...mapState(useStorageStore, ['dropboxAccessToken'])
    },
}
</script>
    
<style scoped lang="scss">
</style>
    