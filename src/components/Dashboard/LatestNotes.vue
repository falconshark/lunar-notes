<template>
    <div class="latest-notes-wrapper">
        <h2 class="page-subheader">
            Latest Notes
        </h2>
        <div class="notes" v-if="!loading">
            <div class="card note" v-for="note in notes">
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
            </div>
        </div>
        <div v-else>
            Now Loading...
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia';
import { useStorageStore } from '@/stores/storage';
import Common from '@/lib/Common';
import Storage from '@/lib/Storage';
import Note from '@/lib/Note';

export default {
    name: 'LatestNotes',
    mounted() {
        this.loadStorageContent();
    },
    data() {
        return {
            notes: [],
            loading: true,
        }
    },
    methods: {
        getNotebook(notePath) {
            const notebook = Note.getNotebook(notePath);
            return notebook;
        },
        parseDate(dateString) {
            const date = Common.parseDate(dateString, 'Do MMM YYYY');
            return date;
        },
        async loadStorageContent() {
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
.page-subheader {
    margin-bottom: 30px;
}

.notes {
    display: flex;
    flex-wrap: wrap;

    .note {
        padding: 15px 20px 10px 20px;
        margin-right: 20px;
        min-height: 253px;
        width: 266px;
        border: 3px solid #E4E9F1;
        border-radius: 5px;

        a {
            display: flex;
            height: 100%;
            flex-direction: column;
            color: black;
        }
    }

    .note-main-info {
        flex: 1;
    }

    .note-title {
        font-weight: bold;
        font-size: 1.1em;
    }

    .note-content {
        margin-top: 30px;
    }

    .note-date {
        text-align: right;
    }
}
</style>