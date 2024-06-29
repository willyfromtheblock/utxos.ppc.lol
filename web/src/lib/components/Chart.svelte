<script lang="ts">
	import type { ChartData } from '$lib/types/ChartData';
	import * as Highcharts from 'highcharts';
	import Exporting from 'highcharts/modules/exporting';
	import { afterUpdate, onMount } from 'svelte';

	export let chartData: ChartData[] = [];
	export let chartId: string;
	export let chartTitle: string;
	export let yAxisTitle: string;
	export let xAxisTitle: string;
	export let valueName: string;
	let options: Highcharts.Options;

	$: {
		options = {
			chart: {
				renderTo: chartId,
				type: 'bar',
				inverted: true
			},
			colors: ['#3cb054', '#b35900', 'dodgerblue'],
			title: {
				text: chartTitle
			},
			legend: {
				enabled: false
			},
			xAxis: {
				allowDecimals: false,
				title: {
					text: xAxisTitle,
					style: {
						'font-size': '0.8rem'
					}
				},
				reversed: chartId === 'diffValueOfUtxos' ? true : false
			},
			yAxis: {
				title: {
					text: yAxisTitle,
					style: {
						'font-size': '0.8rem'
					}
				},
				min: 0.1,
				minorTickInterval: 'auto'
			},
			plotOptions: {
				bar: {
					pointWidth: 8
				},
				series: {
					turboThreshold: 5000,
					dataGrouping: {
						enabled: true,
						forced: true
					}
				}
			},
			series: [
				{
					type: 'bar',
					name: valueName,
					data: chartData
				}
			]
		};
	}

	onMount(async () => {
		// Initialize exporting module.
		Exporting(Highcharts);

		// Generate the chart
		Highcharts.chart(options);
	});

	afterUpdate(async () => {
		Highcharts.charts.forEach((chart) => {
			chart?.userOptions?.chart?.renderTo === chartId && chart?.update(options);
		});
	});
</script>

<div id={chartId} class="chart-container" />

<style>
	.chart-container {
		border-radius: 1rem;
		@media (min-width: 768px) {
			width: 70vw;
		}
		@media (min-width: 1440px) {
			width: 50vw;
		}
		min-height: 400px;
		width: 90vw;
	}
</style>
