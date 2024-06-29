import type { Translation } from '../i18n-types';

const de: Translation = {
	block: 'Block',
	title: 'Peercoin Unverbrauchte Transaktionsausgänge (UTXOs)',
	noData: 'Keine Daten',
	value: 'Wert',
	lastModified: 'Zuletzt geändert: ',
	charts: {
		common: {
			blockHeight: 'Blockhöhe',
			ageInBlocks: 'Alter in Blöcken'
		},
		nOfUtxos: {
			title: 'Kumulative Anzahl UTXOs',
			yAxis: 'Anzahl der UTXOs',
			description:
				'Die Anzahl der UTXOs gruppiert nach Blockhöhe. Sie können dies so lesen, dass y UTXOs vor der Blockhöhe x erstellt wurden.',
			value: 'n'
		},
		valuesOfUtxos: {
			title: 'Kumulativer Wert der UTXOs',
			yAxis: 'Wert der UTXOs',
			description:
				'Der kumulative Wert der UTXOs gruppiert nach Blockhöhe. Sie können dies so lesen, dass y PPC seit der Blockhöhe x unverbraucht sind.',
			value: 'Wert'
		},
		diffValueOfUtxos: {
			title: 'Alter der Münzen',
			yAxis: 'Wert der UTXOs',
			description:
				'Der kumulative Wert der UTXOs in einem Blockhöhenbereich. Sie können dies so lesen, dass y PPC seit x Blöcken unverbraucht sind.',
			value: 'Wert'
		},
		diffNumberOfUtxos: {
			title: 'Alter der Transaktionen',
			yAxis: 'Anzahl der UTXOs',
			description:
				'Die Anzahl der UTXOs in einem Blockhöhenbereich. Sie können dies so lesen, dass y UTXOs vor x Blöcken zuletzt in einer Transaktion verwendet wurden.',
			value: 'n'
		}
	},
	footer: {
		charts: 'Peercoin Diagramme',
		website: 'Peercoin Webseite'
	}
};

export default de;
