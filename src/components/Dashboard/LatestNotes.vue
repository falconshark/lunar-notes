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
            const date = Common.parseDate(dateString, 'MMM Do YYYY');
            return date;
        },
        async loadStorageContent(){
            if(this.authenticated){
                const folderContent = await Storage.listDropboxFiles(this.dbx);
                const noteFiles = await Storage.filterDropboxFiles(folderContent);
                const notes = await Storage.downloadDropboxFiles(this.dbx, noteFiles);
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
.notes{
    display: flex;
    flex-wrap: wrap;
    min-height: 253px;
    .note{
        padding: 15px 20px 10px 20px;
    }
    .note-main-info{
        flex: 1;
    }
    .note-title{
        font-weight: bold;
        font-size: 1.1em;
    }
    .note-content{
        margin-top: 30px;
    }
    .note-date{
        text-align: right;
    }
}
</style>
    