<template>
    <div class="latest-notes-wrapper">
        <h2 class="page-subheader">
            Latest Notes
        </h2>
        <div class="notes">
            <div class="card note" v-for="note in notes">
                <div class="note-main-info">
                    <div class="note-title">
                        {{ note.title }}
                    </div>
                    <div class="note-content">
                        {{ note.summary }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import { mapState } from 'pinia';
import { useStorageStore } from '@/stores/storage';
import Storage from '@/lib/Storage';
import Note from '@/lib/Note';

export default {
    name: 'LatestNotes',
    mounted(){
        this.loadStorageContent();
    },
    data(){
        return {
            notes: [],
        }
    },
    methods: {
        async loadStorageContent(){
            if(this.authenticated){
                const folderContent = await Storage.listDropboxFiles(this.dbx);
                const noteFiles = Storage.filterDropboxFiles(folderContent);
                const notes = await Storage.downloadDropboxFiles(this.dbx, noteFiles);
                const notesPreview = Note.previewNotes(notes);
                this.notes = notesPreview;
            }
        },
    },
    computed: {
        ...mapState(useStorageStore, ['dbx', 'authenticated'])
    },
}
</script>
    
<style scoped lang="scss">
.notes{
    display: flex;
    margin-top: 30px;
    flex-wrap: wrap;
    min-height: 253px;
    .note{
        padding: 15px 50px 0px 20px;
    }
    .note-title{
        font-weight: bold;
        font-size: 1.1em;
    }
    .note-content{
        margin-top: 30px;
    }
}
</style>
    