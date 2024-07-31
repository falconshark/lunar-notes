<template>
    <div class="page-notebook">
        <el-dialog v-model="displayForm">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </el-dialog>
        <div class="right-content">
            <h2 class="page-header">
                Notebooks
            </h2>
            <div class="control-buttons">
                <button class="btn btn-primary" @click="showForm">Add Notebook</button>
            </div>
            <div class="notebook-lists">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="notebook in notebooks">
                            <td>{{ notebook.name }}</td>
                            <td class="action-links">
                                <a href="#">View</a>
                                <a href="#">Remove</a>
                            </td>
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
import NotebookForm from '@/components/Notebook/NotebookForm.vue';

export default {
    name: 'Notebooks',
    components: {
        NotebookForm,
    },
    mounted() {
        this.loadStorageContent();
    },
    data() {
        return {
            notebooks: [],
            loading: true,
            displayForm: false,
        }
    },
    methods: {
        showForm() {
            this.displayForm = true;
        },
        closeForm() {
            this.displayForm = false;
        },
        async loadStorageContent() {
            if (this.authenticated) {
                let storageContent = [];
                const rootFolderContent = await Storage.listDropboxFiles(this.dbx, '');
                //Get all content inculde notebook
                for (let i = 0; i < rootFolderContent.length; i++) {
                    const folderContent = rootFolderContent[i];
                    storageContent.push(folderContent);
                }
                const notebooks = await Storage.filterDropboxFolders(storageContent);
                this.notebooks = notebooks;
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

.action-links {
    display: flex;

    a {
        display: block;
        margin-right: 20px;
    }
}

.control-buttons {
    margin-bottom: 20px;
}
</style>