<script type="ts">
	import Chart from '$lib/components/Chart.svelte';
	export let data;
	import { t } from '$lib/i18n/translations';
</script>

<div class="container">
	<Chart
		chartTitle={$t('home.charts.nOfUtxos.title')}
		chartId="nOfUtxos"
		chartData={data.nOfUtxos}
		xAxisTitle={$t('home.charts.common.blockHeight')}
		yAxisTitle={$t('home.charts.nOfUtxos.yAxis')}
		valueName={$t('home.charts.nOfUtxos.value')}
	/>
	<Chart
		chartTitle={$t('home.charts.valuesOfUtxos.title')}
		chartId="valuesOfUtxos"
		chartData={data.valuesOfUtxos}
		xAxisTitle={$t('home.charts.common.blockHeight')}
		yAxisTitle={$t('home.charts.valuesOfUtxos.yAxis')}
		valueName={$t('home.charts.valuesOfUtxos.value')}
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
