<script lang="ts">
	import { setLocale } from '$i18n/i18n-svelte';
	import type { LayoutData } from './$types';
	import LL from '$i18n/i18n-svelte';
	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';
	import HeadHrefLangs from '$lib/components/HeadHrefLangs.svelte';

	export let data: LayoutData;
	// at the very top, set the locale before you access the store and before the actual rendering takes place
	setLocale(data.locale);
</script>

<header>
	<img src="/peercoin.svg" alt="Logo" height="150px" />
	<h2>{$LL.title()}</h2>
	<LocaleSwitcher />
</header>
<main>
	<slot />
</main>

<footer>
	<hr />
	<div>
		<a href="https://ppc.lol/charts" target="_blank" rel="noopener noreferrer"
			>{$LL.footer.charts()}
		</a>
		<a href="https://ppc.lol/dotnet" target="_blank" rel="noopener noreferrer"
			>{$LL.footer.website()}
		</a>
		<span class="donations">Donations: PM7jjBUPjzpkZy1UZtD7mvmHoXJ2BGvbx9</span>
		<a href="https://www.coinerella.com" target="_blank" rel="noopener noreferrer">
			<img
				src="https://fonts.peercoinexplorer.net/coinerella.png"
				alt="Coinerella"
				class="coinerella"
			/>
		</a>
	</div>
</footer>

<svelte:head>
	<HeadHrefLangs />
</svelte:head>

<style>
	:global(body) {
		font-family: 'Roboto', sans-serif;
		background: var(--peercoin-white);
		color: white;
		padding: 0.5rem;
		margin-left: 1rem;
		margin-right: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		@media (min-width: 768px) {
			padding: 1rem;
			margin-left: 3rem;
			margin-right: 3rem;
		}
	}
	:global(hr) {
		color: var(--peercoin-white);
	}

	:global(a) {
		color: lightgrey;
		text-decoration: none;
	}
	:global(:root) {
		--peercoin-green: rgb(60, 176, 84);
		--peercoin-white: var(--peercoin-white);
		--peercoin-accent: #dff0d8;
	}
	.donations {
		font-size: 1rem;
		@media (min-width: 768px) {
			font-size: 1.5rem;
		}
	}

	header {
		color: var(--peercoin-green);
		background-color: var(--peercoin-accent);
		padding: 1rem;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 2rem;
		gap: 1rem;
		@media (min-width: 768px) {
			justify-content: space-evenly;
			gap: 3rem;
		}
	}
	footer {
		color: var(--peercoin-green);
		margin-top: 1.5rem;
		text-align: center;
	}
	footer > div {
		margin-top: 1.5rem;
		font-size: 1.5rem;
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
		align-items: center;
	}
	footer > div > a {
		color: var(--peercoin-green);
	}
	.coinerella {
		margin-top: 1rem;
		height: 50px;
		filter: invert(1);
	}
</style>
