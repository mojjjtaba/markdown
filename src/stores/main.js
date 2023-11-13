import {defineStore} from "pinia";
import {ref} from "vue";

export const useMainStore = defineStore('modal', () => {
    let isImageFileVideoModalOpen = ref(false);
    let contentType = ref('')
    let markdownPureContent = ref('# first header \n## second header \n### third header \ntext \n \n1. one\n2. two\n3. three \n \n_Italic_  \n**Bold text** \n')

    return {
        isImageFileVideoModalOpen,
        contentType,
        markdownPureContent
    }
})