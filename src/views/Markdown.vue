<template>
	<v-container>
		<v-row justify="center" align="center">
			<v-col cols="12">
				<v-card class="bg-white pa-10 rounded-0">
					<v-card-title class="d-flex justify-space-between text-body-1 font-weight-medium mb-10 pa-0">
						<div>Content</div>
						<v-btn-toggle
							v-model="activeTab"
							rounded="0"
						>
							<v-btn value="Editor" size="small">Editor</v-btn>
							<v-btn value="HTML" size="small">HTML</v-btn>
						</v-btn-toggle>
					</v-card-title>
					<v-card-text class="pa-0">
						<section v-if="activeTab === 'Editor'" class="markdown">
							<header class="d-flex overflow-x-auto px-1.5 py-1.5">
								<v-btn
									v-for="(item, index) in contentTypeList"
									:key="index"
									class="text-gray text-body-1 font-weight-regular rounded-0"
									variant="text"
									@click="contentItemClicked(item.title)"
								>
									{{ item.title }}
								</v-btn>
							</header>
							<v-divider class="mx-4 border-opacity-100" color="light-gray"></v-divider>
							<div class="content d-flex">
									<textarea
										v-model="markdownPureContent"
										class="w-100 pa-4 text-body-1 font-weight-regular"
									></textarea>
							</div>
						</section>
						<Markdown
							v-else
							:source="markdownPureContent"
							class="mt-10"
						/>
						<div class="guide mt-5">
							**Bold** *Italic* _Underline_ - List with bullets # H1 ## H2 ### H3 #### H4 ##### H5 ###### H6
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
	
	<!-- ImageFileVideo Modal -->
	<ImageFileVideoModal/>
	<!-- End ImageFileVideo Modal -->

</template>

<script setup>
import Markdown from 'vue3-markdown-it';
import {useMainStore} from "../stores/main.js";
import 'highlight.js/styles/monokai.css';
import ImageFileVideoModal from "../components/ImageFileVideoModal.vue";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const contentTypeList = [
	{id: 1, title: 'Image'},
	{id: 2, title: 'Video'},
	{id: 3, title: 'Description'},
	{id: 4, title: 'Quote'},
	{id: 5, title: 'Footnote'},
	{id: 6, title: 'Link'},
	{id: 7, title: 'Button'},
	{id: 8, title: 'File'},
	{id: 9, title: '2 Columns'},
	{id: 10, title: 'Table'},
	{id: 10, title: 'Table row'}
]

let {isImageFileVideoModalOpen, contentType, markdownPureContent} = storeToRefs(useMainStore())
let activeTab = ref('Editor')

function contentItemClicked(itemTitle) {
	contentType.value = itemTitle;
	
	if (['Image', 'Video', 'File'].indexOf(itemTitle) > -1) {
		isImageFileVideoModalOpen.value = true;
	}
}
</script>

<style lang="scss" scoped>
.v-card {
	box-shadow: 0px 1px 2px 0px #333D4554;
}

.v-btn {
	padding-right: 10px;
	padding-left: 10px;
	height: 24px;
}

.px-1\.5 {
	padding-left: 6px !important;
	padding-right: 6px !important;
}

.py-1\.5 {
	padding-top: 6px !important;
	padding-bottom: 6px !important;
}

.markdown {
	border: 1px solid #E0E2E3;
}

textarea {
	outline: 0;
	min-height: 492px;
}

.guide {
	font-size: 13px;
	color: #333D4580;
}

@media (min-width: 1280px) {
	.v-container {
		min-width: 1232px;
	}
}
</style>