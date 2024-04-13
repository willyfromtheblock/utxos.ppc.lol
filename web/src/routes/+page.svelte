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
	<p>
		{$t('home.charts.nOfUtxos.description')}
	</p>
	<hr />
	<Chart
		chartTitle={$t('home.charts.valuesOfUtxos.title')}
		chartId="valuesOfUtxos"
		chartData={data.valuesOfUtxos}
		xAxisTitle={$t('home.charts.common.blockHeight')}
		yAxisTitle={$t('home.charts.valuesOfUtxos.yAxis')}
		valueName={$t('home.charts.valuesOfUtxos.value')}
	/>
	<p>
		{$t('home.charts.valuesOfUtxos.description')}
	</p>
</div>
<div class="last-modified">
	{$t('home.lastModified')}{data.lastModified}
</div>

<style>
	.last-modified {
		color: var(--peercoin-green);
		margin-top: 2rem;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}
	.container > hr {
		color: var(--peercoin-white);
		width: 33%;
		margin: 0 auto;
	}
	.container > p {
		color: black;
	}
</style>
