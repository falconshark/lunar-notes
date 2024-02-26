<template>
    <div class="note-form">
        <div class="action-buttons">
            <button class="btn btn-primary" @click="save">Save</button>
        </div>
        <div class="note-info-wrapper">
            <input id="note-title" class="input-text" v-model="noteTitle" placeholder="New Note" type="text" />
            <div class="notebook-select">
                <i class="bi bi-book"></i>
                <el-select v-model="notebook" filterable placeholder="请选择">
                    <el-option v-for="notebook in notebooks" :key="notebook" :label="notebook" :value="notebook"></el-option>
                </el-select>
            </div>
        </div>
        <div class="note-editor">
            <QuillEditor ref="editor" theme="snow" />
        </div>
    </div>
</template>
    
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    name: 'CreateNote',
    components: {
        QuillEditor,
    },
    props: {
        action: String,
    },
    data() {
        return {
            noteTitle: '',
            notebook: 'Uncategorized',
            notebooks: ['Uncategorized'],
        };
    },
    methods: {
        async save() {
            const title = this.noteTitle;
            const content = this.$refs.editor.getHTML();
            switch (action) {
                case 'create':

                    break;
                case 'update':
                    break;
                default:
                    break;
            }
        },
    },
}
</script>
    
<style lang="scss" scoped>
.action-buttons {
    text-align: right;
    width: 100%;

    .btn {
        display: inline-block;
    }
}

.note-info-wrapper {
    margin-bottom: 20px;

    .input-text {
        font-size: 1.5em;
        font-weight: bold;
        border: 0;
        width: 100%;
        border-bottom: 1px solid #ddd;
        padding-top: 10px;
        padding-bottom: 10px;
    }
}

.notebook-select {
    margin-top: 10px;
    display: flex;
    align-items: center;

    .bi {
        font-size: 1.4em;
        color: rgb(127, 127, 127);
        margin-right: 10px;
    }
}
</style>