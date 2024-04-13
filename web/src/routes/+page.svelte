<script type="ts">
	import Chart from '$lib/components/Chart.svelte';
	export let data;
	import { t } from '$lib/i18n/translations';
</script>

<div class="container">
	<Chart
		chartTitle="Number of UTXOs"
		chartId="nOfUtxos"
		chartData={data.nOfUtxos}
		xAxisTitle="Block Height"
		yAxisTitle="Number of UTXOs"
		valueName="n"
	/>
	<Chart
		chartTitle="Cummulative value of UTXOs"
		chartId="valuesOfUtxos"
		chartData={data.valuesOfUtxos}
		xAxisTitle="Block Height"
		yAxisTitle="Cummulative value of UTXOs"
		valueName="Value"
	/>
</div>
<div class="last-modified">
	{$t('home.lastModified')}{data.lastModified}
</div>

<style>
	.last-modified {
		color: var(--peercoin-green);
		margin-top: 1.5rem;
	}
	.container {
		display: grid;
		grid-gap: 20px;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		@media (min-width: 1024px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
