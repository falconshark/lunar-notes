<template>
    <div class="latest-notes-wrapper">
        <h2 class="page-subheader">
            Latest Notes
        </h2>
        <Loader v-if="loading"/>
        <div class="notes" v-else>
            <div class="card note" v-for="note in notes">
                <div class="note-main-info">
                    <div class="note-title">
                        {{ note.title }}
                    </div>
                    <div class="note-content">
                        {{ note.summary }}
                    </div>
                </div>
                <div class="note-date">
                    {{ parseDate(note.date) }}
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import { mapState } from 'pinia';
import { useStorageStore } from '@/stores/storage';
import Loader from '@/components/common/Loading.vue';
import Common from '@/lib/Common';
import Storage from '@/lib/Storage';
import Note from '@/lib/Note';

export default {
    name: 'LatestNotes',
    components:{
        Loader
    },
    mounted(){
        this.loadStorageContent();
    },
    data(){
        return {
            notes: [],
            loading: true,
        }
    },
    methods: {
        parseDate(dateString){
            const date = Common.parseDate(dateString, 'Do MMM YYYY');
            return date;
        },
        async loadStorageContent(){
            if(this.authenticated){
                let storageContent = [];
                const rootFolderContent = await Storage.listDropboxFiles(this.dbx, '');
                //Get all content inculde notebook
                for(let i = 0; i < rootFolderContent.length; i++){
                    const folderContent = rootFolderContent[i];
                    if(folderContent['.tag'] === 'folder'){
                        let subFolderContent = await Storage.listDropboxFiles(this.dbx, folderContent['path_lower']);
                        storageContent = storageContent.concat(subFolderContent);
                    }else{
                        storageContent.push(folderContent);
                    }
                }
                const noteFiles = await Storage.filterDropboxFiles(storageContent);
                let notes = await Storage.downloadDropboxFiles(this.dbx, noteFiles);
                notes = Note.sortNotes(notes);
                const notesPreview = await Note.previewNotes(notes);
                this.notes = notesPreview;
                this.loading = false;
            }
        },
    },
    computed: {
        ...mapState(useStorageStore, ['dbx', 'authenticated'])
    },
}
</script>
    
<style scoped lang="scss">
.page-subheader{
    margin-bottom: 30px;
}
</style>
    