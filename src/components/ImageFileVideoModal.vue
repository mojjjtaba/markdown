<template>
	
	<!-- Modal -->
	<v-dialog
		v-model="isImageFileVideoModalOpen"
		transition="dialog-top-transition"
		width="500"
	>
		<template v-slot:default="{ isActive }">
			<v-card>
				<v-toolbar
					color="primary"
					:title="`Select a ${contentType}`"
				></v-toolbar>
				<v-card-text class="mt-4">
					<v-form ref="form" @submit.prevent="addNewMarkdownCode">
						<v-select
							v-model="contentType"
							@update:model-value="contentTypeChanged"
							:items="['Image', 'Video', 'File']"
							label="File Type"
						></v-select>
						<v-file-input
							v-model="fileInput"
							:label="`${contentType} input`"
							:rules="fileInputRules"
						></v-file-input>
						<v-btn
							size="large"
							type="submit"
							variant="elevated"
							color="success"
							class="mt-5"
							width="100%"
						>
							Add {{ contentType }} to Markdown
						</v-btn>
					</v-form>
				</v-card-text>
				<v-card-actions class="justify-end mt-8">
					<v-btn
						variant="text"
						@click="isActive.value = false"
					>Close
					</v-btn>
				</v-card-actions>
			</v-card>
		</template>
	</v-dialog>
	<!-- End Modal -->
	
	<!-- Alert -->
	<v-snackbar
		v-model="isAlertVisible"
		color="success"
	>Successfully added
		
		<template v-slot:actions>
			<v-btn
				color="black"
				variant="text"
				@click="isAlertVisible = false"
			>
				Close
			</v-btn>
		</template>
	</v-snackbar>
	<!-- End Alert -->
	
</template>

<script setup>
import {useMainStore} from "../stores/main.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import API from "../api.js";

let {isImageFileVideoModalOpen, contentType, markdownPureContent} = storeToRefs(useMainStore())
let isAlertVisible = ref(false)
const form = ref(null)
let fileInput = ref([])

async function addNewMarkdownCode() {
	if(!form.value.isValid) return;
	
	const uploadedFileUrl = await uploadFile(fileInput.value[0])
	const markdownCode = makeMarkdownCode(uploadedFileUrl, fileInput.value[0].name)
	markdownPureContent.value += markdownCode;
	
	isAlertVisible.value = true;
	isImageFileVideoModalOpen.value = false;
	
	form.value.reset()
	form.value.resetValidation()
}

function makeMarkdownCode(url, fileName) {
	let markdownCode = '';
	
	switch (contentType.value) {
		case "Image":
			markdownCode = `\n![Image - (${fileName})](${url}) \n`;
			break;
		case "Video":
			markdownCode = `\n![Video - (${fileName})](${url}) \n`;
			break;
		case "File":
			markdownCode = `\n[File - (${fileName})](${url}) \n`;
			break;
	}
	
	return markdownCode;
}

function uploadFile(file) {
	return new Promise((resolve, reject) => {
		const formData = new FormData();
		formData.append('file', file);
		
		API.post('', formData)
			.then(response => {
				resolve(response.data.url);
			})
			.catch(error => {
				reject(new Error('File upload failed'));
			});
	});
}

const fileInputRules = [
	value => {
		let file = value && value[0];
		
		if(!file) return `${contentType.value} is required.`
	
		const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
		const videoExtensions = ['mp4', 'avi', 'mov', 'mkv'];

		const fileName = file?.name?.toLowerCase();
		const fileExtension = fileName?.split('.').pop();
		
		if (contentType.value === 'Image' && !imageExtensions.includes(fileExtension)) {
			return `Valid image extensions are ${imageExtensions.join(', ')}.`
		}
		
		if (contentType.value === 'Video' && !videoExtensions.includes(fileExtension)) {
			return `Valid video extensions are ${videoExtensions.join(', ')}.`
		}
		
		if (file) return true
	},
]

function contentTypeChanged() {
	form.value.resetValidation()
	
	if(fileInput.value && fileInput.value[0]) fileInput.value = []
}

</script>