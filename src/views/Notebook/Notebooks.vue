<template>
    <div class="page-notebook">
        <div class="right-content">
            <h2 class="page-header">
                Notebooks
            </h2>
            <div class="notebook-lists">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
    name: 'Notebooks',
    mounted() {
        //this.loadStorageContent();
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
.right-content {
    padding: 15px 20px 10px 20px;
}
</style>