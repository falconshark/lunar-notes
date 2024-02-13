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
        async loadStorageContent(){
            if(this.authenticated){
                const folderContent = await Storage.listDropboxFiles(this.dbx);
                const noteFiles = Storage.filterDropboxFiles(folderContent);
                const notes = Storage.downloadDropboxFiles(this.dbx, noteFiles);
            }
        },
    },
    computed: {
        ...mapState(useStorageStore, ['dbx', 'authenticated'])
    },
}
</script>
    
<style scoped lang="scss">
</style>
    