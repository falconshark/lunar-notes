<template>
    <div class="note-list-wrapper">
        <Loading v-if="loading" />
        <div class="note-list-inner" v-else>
            <div class="topbar-area">
                <div class="search-wrapper">
                    <input class="search-input" placeholder="Search Note">
                </div>
                <div class="action-buttons">
                    <button class="action-button new-note">
                        <i class="bi bi-pencil-fill"></i>
                    </button>
                </div>
            </div>
            <ul class="notes">
                <li class="note" v-for="note in notes">
                    <router-link :to="{
                        name: 'Note', params: {
                            notebook: getNotebook(note.path),
                            date: parseDate(note.date, 'MM-DD-YYYY'), filename: note.title
                        }
                        }">
                        <div class="note-main-info">
                            <h3 class="note-title">
                                {{ note.title }}
                            </h3>
                            <div class="note-content">
                                {{ note.summary }}
                            </div>
                        </div>
                        <div class="note-date">
                            {{ parseDate(note.date, 'Do MMM YYYY') }}
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useStorageStore } from '@/stores/storage';
import { useNoteStore } from '@/stores/note';
import Loading from '../Common/Loading.vue';
import Common from '@/lib/Common';
import Storage from '@/lib/Storage';
import Note from '@/lib/Note';

export default {
    name: 'NoteList',
    mounted() {
        this.loadStorageContent();
    },
    components:{
        Loading
    },
    data(){
        return {
            loading: true,
        };
    },
    methods: {
        getNotebook(notePath) {
            const notebook = Note.getNotebook(notePath);
            return notebook;
        },
        parseDate(dateString, format) {
            const date = Common.parseDate(dateString, format);
            return date;
        },
        async loadStorageContent() {
            //Only load content when dropbox authenticated and notes had not been loaded.
            if (this.authenticated) {
                let storageContent = [];
                const rootFolderContent = await Storage.listDropboxFiles(this.dbx, '');
                //Get all content inculde notebook
                for (let i = 0; i < rootFolderContent.length; i++) {
                    const folderContent = rootFolderContent[i];
                    if (folderContent['.tag'] === 'folder') {
                        let subFolderContent = await Storage.listDropboxFiles(this.dbx, folderContent['path_lower']);
                        storageContent = storageContent.concat(subFolderContent);
                    } else {
                        storageContent.push(folderContent);
                    }
                }
                const noteFiles = await Storage.filterDropboxFiles(storageContent);
                let notes = await Storage.downloadDropboxFiles(this.dbx, noteFiles);
                notes = Note.sortNotes(notes);
                const notesPreview = await Note.previewNotes(notes);
                this.updateNoteList(notesPreview);
                this.loading = false;
            }
        },
        ...mapActions(useNoteStore, ['updateNoteList'])
    },
    computed: {
        ...mapState(useStorageStore, ['dbx', 'authenticated']),
        ...mapState(useNoteStore, ['notes'])
    },
}
</script>

<style lang="scss">
.loader{
    position: absolute;
    top: 40%;
    left: 40%;
}
.note-list-wrapper {
    background-color: white;
    height: 100vh;
    flex-basis: 30%;
    padding-left: 20px;
    border-left: 1px solid #EAEAEA;
    border-right: 1px solid #EAEAEA;
    position: relative;
}

.note-list-inner{
    height: 100%;
}

.topbar-area{
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #EAEAEA;
    display: flex;

    .search-wrapper{
        position: relative;
        flex: 1;
        &::before{
            display: block;
            position: absolute;
            left: 20px;
            content: "\f52a";
            font-family: "Bootstrap-icons";
            top: 3px;
        }
    }
    .search-input{
        border-radius: 30px;
        border: 1px solid #EAEAEA;
        padding-left: 50px;
        padding-top: 5px;
        padding-bottom: 5px;
        font-size: 13px;
    }
    .action-button{
        background-color: white;
        border: 1px solid #ddd;
        padding: 4px 10px;
        margin-right: 10px;
        &:hover{
            background-color: black;
            color: white;
        }
    }
}
.notes {
    height: 100%;
    list-style: none;
    padding: 0;
    .note-title{
        font-size: 1.1em;
        margin-bottom: 10px;
    }
    .note-date{
        text-align: right;
    }
    .note{
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 5px;
        border-bottom: 1px solid #EAEAEA;
        margin-bottom: 10px;
    }
}
</style>