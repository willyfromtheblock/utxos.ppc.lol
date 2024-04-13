import type { BaseTranslation } from '../i18n-types';

const en = {
	block: 'Block',
	noData: 'No data',
	title: 'Peercoin Unspent Transactions Outputs (UTXOs)',
	value: 'Value',
	lastModified: 'Last modified: ',
	charts: {
		common: {
			blockHeight: 'Block Height'
		},
		nOfUtxos: {
			title: 'Cumulative Number UTXOs',
			yAxis: 'Number of UTXOs',
			description:
				'The number of UTXOs grouped by block height. You may read this as y UTXOs have been created before x block height.',
			value: 'n'
		},
		valuesOfUtxos: {
			title: 'Cumulative Value of UTXOs',
			yAxis: 'Value of UTXOs',
			description:
				'The cumulative value of UTXOs grouped by block height. You may read this as y PPC are unspent since x block height.',
			value: 'Value'
		},
		diffValueOfUtxos: {
			title: 'Age of Coins',
			yAxis: 'Value of UTXOs',
			description:
				'The difference of UTXO value grouped by block height compared to the previous slice. You may read this as y PPC were last involved in a transaction between x block height time slices.',
			value: 'Value'
		}
	},
	footer: {
		charts: 'Peercoin Charts',
		website: 'Peercoin Website'
	}
} satisfies BaseTranslation;

export default en;
