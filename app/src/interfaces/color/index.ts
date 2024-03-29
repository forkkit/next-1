import { defineInterface } from '@/interfaces/define';
import InterfaceColor from './color.vue';

export default defineInterface(({ i18n }) => ({
	id: 'color',
	name: i18n.t('color'),
	icon: 'palette',
	component: InterfaceColor,
	types: ['string'],
	options: [
		{
			field: 'presets',
			name: i18n.t('preset_colors'),
			type: 'string',
			meta: {
				width: 'full',
				interface: 'repeater',
				options: {
					template: '{{ name }} - {{ color }}',
					fields: [
						{
							field: 'name',
							type: 'string',
							name: i18n.t('name'),
							meta: {
								interface: 'text-input',
								width: 'half',
							}
						},
						{
							field: 'color',
							type: 'string',
							name: i18n.t('color'),
							meta: {
								interface: 'color',
								width: 'half'
							}
						}
					]
				}
			}
		},
	],
}));
