import type { ChartData } from '$lib/types/ChartData.js';

export async function load({
	fetch
}): Promise<{ nOfUtxos: ChartData[]; valuesOfUtxos: ChartData[]; lastModified: string } | {}> {
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

		return {
			nOfUtxos: nOfUtxosDataTransformedData,
			valuesOfUtxos: valuesOfUtxosTransformedData,
			lastModified: nOfUtxosResponse.headers.get('last-modified')
		};
	} catch (error) {
		console.error(error);
		return {};
	}
}
