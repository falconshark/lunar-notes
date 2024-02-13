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
                const folderContent = await Storage.loadDropboxContent(this.dbx);
                const noteFiles = Storage.filterDropboxFiles(folderContent);
                const notes = Storage.readNotesFiles(notesFiles);
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
    