<template>
	<v-modal v-model="_active" :title="$t('select_item')" no-padding>
		<component
			:is="`layout-${layout}`"
			:collection="collection"
			:selection="_selection"
			:filters="filters"
			:view-query.sync="query"
			:view-options.sync="options"
			@update:selection="onSelect"
			select-mode
			class="layout"
		/>

		<template #footer>
			<v-button @click="cancel" secondary>{{ $t('cancel') }}</v-button>
			<v-button @click="save">{{ $t('save') }}</v-button>
		</template>
	</v-modal>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, toRefs, onUnmounted } from '@vue/composition-api';
import { Filter } from '@/stores/presets/types';
import usePreset from '@/composables/use-collection-preset';

export default defineComponent({
	props: {
		active: {
			type: Boolean,
			default: false,
		},
		selection: {
			type: Array as PropType<(number | string)[]>,
			default: () => [],
		},
		collection: {
			type: String,
			required: true,
		},
		multiple: {
			type: Boolean,
			default: false,
		},
		filters: {
			type: Array as PropType<Filter[]>,
			default: () => [],
		},
	},
	setup(props, { emit }) {
		const { save, cancel } = useActions();
		const { _active } = useActiveState();
		const { _selection, onSelect } = useSelection();

		const { collection } = toRefs(props);

		const { viewType, viewOptions, viewQuery } = usePreset(collection);

		// This is a local copy of the viewtype. This means that we can sync it the layout without
		// having use-collection-preset auto-save the values
		const layout = ref(viewType.value || 'tabular');
		const options = ref(viewOptions.value);
		const query = ref(viewQuery.value);

		return { save, cancel, _active, _selection, onSelect, layout, options, query };

		function useActiveState() {
			const localActive = ref(false);

			const _active = computed({
				get() {
					return props.active === undefined ? localActive.value : props.active;
				},
				set(newActive: boolean) {
					localActive.value = newActive;
					emit('update:active', newActive);
				},
			});

			return { _active };
		}

		function useSelection() {
			const localSelection = ref<(string | number)[] | null>(null);

			onUnmounted(() => {
				localSelection.value = null;
			});

			const _selection = computed({
				get() {
					if (localSelection.value === null) {
						return props.selection;
					}

					return localSelection.value;
				},
				set(newSelection: (string | number)[]) {
					localSelection.value = newSelection;
				},
			});

			return { _selection, onSelect };

			function onSelect(newSelection: (string | number)[]) {
				if (newSelection.length === 0) {
					localSelection.value = [];
					return;
				}

				if (props.multiple === true) {
					localSelection.value = newSelection;
				} else {
					localSelection.value = [newSelection[newSelection.length - 1]];
				}
			}
		}

		function useActions() {
			return { save, cancel };

			function save() {
				emit('input', _selection.value);
				_active.value = false;
			}

			function cancel() {
				_active.value = false;
			}
		}
	},
});
</script>

<style lang="scss" scoped>
.layout {
	--layout-offset-top: 0px;
}
</style>
