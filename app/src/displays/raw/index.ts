import { defineDisplay } from '@/displays/define';
import { types } from '@/stores/fields/types';

export default defineDisplay(({ i18n }) => ({
	id: 'raw',
	name: i18n.t('displays.raw.raw'),
	icon: 'dns',
	handler: (value) => value,
	options: [],
	types: types,
}));
