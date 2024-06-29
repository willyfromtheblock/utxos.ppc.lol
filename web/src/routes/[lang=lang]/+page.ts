import type { ChartData } from '$lib/types/ChartData.js';

export async function load({ fetch }): Promise<
	| {
			nOfUtxos: ChartData[];
			valuesOfUtxos: ChartData[];
			diffValueOfUtxos: ChartData[];
			diffNumberOfUtxos: ChartData[];
			lastModified: string;
	  }
	| {}
> {
	try {
		const nOfUtxosResponse = await fetch(`https://utxos-bucket.ppc.lol/nOfUtxos.json`);
		const nOfUtxosData: ChartData[] = await nOfUtxosResponse.json();
		const nOfUtxosDataTransformedData = nOfUtxosData.map((item: any) => [item.height, item.count]);

		const valuesOfUtxosResponse = await fetch('https://utxos-bucket.ppc.lol/valuesOfUtxos.json');
		const valuesOfUtxosData = await valuesOfUtxosResponse.json();
		const valuesOfUtxosTransformedData = valuesOfUtxosData.map((item: any) => [
			item.height,
			item.count
		]);

		const diffValueOfUtxosResponse = await fetch(
			'https://utxos-bucket.ppc.lol/diffValueOfUtxos.json'
		);
		const diffValueOfUtxosData = await diffValueOfUtxosResponse.json();
		const diffValueOfUtxosTransformedData = diffValueOfUtxosData.map((item: any) => [
			item.height,
			item.count
		]);

		const diffNumberOfUtxosResponse = await fetch(
			'https://utxos-bucket.ppc.lol/diffNumberOfUtxos.json'
		);
		const diffNumberOfUtxosData = await diffNumberOfUtxosResponse.json();
		const diffNumberOfUtxosTransformedData = diffNumberOfUtxosData.map((item: any) => [
			item.height,
			item.count
		]);

		return {
			nOfUtxos: nOfUtxosDataTransformedData,
			valuesOfUtxos: valuesOfUtxosTransformedData,
			diffValueOfUtxos: diffValueOfUtxosTransformedData,
			diffNumberOfUtxos: diffNumberOfUtxosTransformedData,
			lastModified: nOfUtxosResponse.headers.get('last-modified')
		};
	} catch (error) {
		console.error(error);
		return {};
	}
}
