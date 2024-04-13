<script type="ts">
	import Chart from '$lib/components/Chart.svelte';
	export let data;
	import LL from '$i18n/i18n-svelte';
</script>

<div class="container">
	<Chart
		chartTitle={$LL.charts.nOfUtxos.title()}
		chartId="nOfUtxos"
		chartData={data.nOfUtxos}
		xAxisTitle={$LL.charts.common.blockHeight()}
		yAxisTitle={$LL.charts.nOfUtxos.yAxis()}
		valueName={$LL.charts.nOfUtxos.value()}
	/>
	<p>
		{$LL.charts.nOfUtxos.description()}
	</p>
	<hr />
	<Chart
		chartTitle={$LL.charts.valuesOfUtxos.title()}
		chartId="valuesOfUtxos"
		chartData={data.valuesOfUtxos}
		xAxisTitle={$LL.charts.common.blockHeight()}
		yAxisTitle={$LL.charts.valuesOfUtxos.yAxis()}
		valueName={$LL.charts.valuesOfUtxos.value()}
	/>
	<p>
		{$LL.charts.valuesOfUtxos.description()}
	</p>
	<hr />
	<Chart
		chartTitle={$LL.charts.diffValueOfUtxos.title()}
		chartId="diffValueOfUtxos"
		chartData={data.diffValueOfUtxos}
		xAxisTitle={$LL.charts.common.blockHeight()}
		yAxisTitle={$LL.charts.diffValueOfUtxos.yAxis()}
		valueName={$LL.charts.diffValueOfUtxos.value()}
	/>
	<p>
		{$LL.charts.diffValueOfUtxos.description()}
	</p>
</div>
<div class="last-modified">
	{$LL.lastModified}{data.lastModified}
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
