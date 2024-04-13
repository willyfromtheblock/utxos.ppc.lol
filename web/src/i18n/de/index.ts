import type { Translation } from '../i18n-types';

const de: Translation = {
	block: 'Block',
	title: 'Peercoin Unverbrauchte Transaktionsausgänge (UTXOs)',
	noData: 'Keine Daten',
	value: 'Wert',
	lastModified: 'Zuletzt geändert: ',
	charts: {
		common: {
			blockHeight: 'Blockhöhe'
		},
		nOfUtxos: {
			title: 'Anzahl der UTXOs',
			yAxis: 'Anzahl der UTXOs',
			description:
				'Die Anzahl der UTXOs gruppiert nach Blockhöhe. Sie können dies so lesen, dass y UTXOs vor der Blockhöhe x erstellt wurden.',
			value: 'n'
		},
		valuesOfUtxos: {
			title: 'Kumulativer Wert der UTXOs',
			yAxis: 'Kumulativer Wert der UTXOs',
			description:
				'Der kumulative Wert der UTXOs gruppiert nach Blockhöhe. Sie können dies so lesen, dass y PPC seit der Blockhöhe x unverbraucht sind.',
			value: 'Wert'
		},
		diffValueOfUtxos: {
			title: 'Diff-Wert der UTXOs',
			yAxis: 'Wert der UTXOs',
			description:
				'Der Unterschied des UTXO-Wertes gruppiert nach Blockhöhe im Vergleich zur vorherigen Scheibe. Sie können dies so lesen, dass y PPC zwischen den Zeitscheiben der Blockhöhe x erstellt wurden.',
			value: 'Wert'
		}
	},
	footer: {
		charts: 'Peercoin Diagramme',
		website: 'Peercoin Webseite'
	}
};

export default de;
