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
				'Der Unterschied des UTXO-Wertes gruppiert nach Blockhöhe im Vergleich zur vorherigen Scheibe. Sie können dies so lesen, dass y PPC zuletzt in einer Transaktion zwischen den Zeitscheiben der Blockhöhe x beteiligt waren.',
			value: 'Wert'
		},
		diffNumberOfUtxos: {
			title: 'Alter der Transaktionen',
			yAxis: 'Anzahl der UTXOs',
			description:
				'Der kumulative Wert der UTXOs in einem Blockhöhenbereich. Sie können dies so lesen, dass y PPC seit x Blöcken unverbraucht sind.',
			value: 'Wert'
		}
	},
	footer: {
		charts: 'Peercoin Diagramme',
		website: 'Peercoin Webseite'
	}
};

export default de;
