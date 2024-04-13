// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'de'
	| 'en'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * B​l​o​c​k
	 */
	block: string
	/**
	 * N​o​ ​d​a​t​a
	 */
	noData: string
	/**
	 * P​e​e​r​c​o​i​n​ ​U​n​s​p​e​n​t​ ​T​r​a​n​s​a​c​t​i​o​n​s​ ​O​u​t​p​u​t​s​ ​(​U​T​X​O​s​)
	 */
	title: string
	/**
	 * V​a​l​u​e
	 */
	value: string
	/**
	 * L​a​s​t​ ​m​o​d​i​f​i​e​d​:​ 
	 */
	lastModified: string
	charts: {
		common: {
			/**
			 * B​l​o​c​k​ ​H​e​i​g​h​t
			 */
			blockHeight: string
		}
		nOfUtxos: {
			/**
			 * C​u​m​u​l​a​t​i​v​e​ ​N​u​m​b​e​r​ ​U​T​X​O​s
			 */
			title: string
			/**
			 * N​u​m​b​e​r​ ​o​f​ ​U​T​X​O​s
			 */
			yAxis: string
			/**
			 * T​h​e​ ​n​u​m​b​e​r​ ​o​f​ ​U​T​X​O​s​ ​g​r​o​u​p​e​d​ ​b​y​ ​b​l​o​c​k​ ​h​e​i​g​h​t​.​ ​Y​o​u​ ​m​a​y​ ​r​e​a​d​ ​t​h​i​s​ ​a​s​ ​y​ ​U​T​X​O​s​ ​h​a​v​e​ ​b​e​e​n​ ​c​r​e​a​t​e​d​ ​b​e​f​o​r​e​ ​x​ ​b​l​o​c​k​ ​h​e​i​g​h​t​.
			 */
			description: string
			/**
			 * n
			 */
			value: string
		}
		valuesOfUtxos: {
			/**
			 * C​u​m​u​l​a​t​i​v​e​ ​V​a​l​u​e​ ​o​f​ ​U​T​X​O​s
			 */
			title: string
			/**
			 * V​a​l​u​e​ ​o​f​ ​U​T​X​O​s
			 */
			yAxis: string
			/**
			 * T​h​e​ ​c​u​m​u​l​a​t​i​v​e​ ​v​a​l​u​e​ ​o​f​ ​U​T​X​O​s​ ​g​r​o​u​p​e​d​ ​b​y​ ​b​l​o​c​k​ ​h​e​i​g​h​t​.​ ​Y​o​u​ ​m​a​y​ ​r​e​a​d​ ​t​h​i​s​ ​a​s​ ​y​ ​P​P​C​ ​a​r​e​ ​u​n​s​p​e​n​t​ ​s​i​n​c​e​ ​x​ ​b​l​o​c​k​ ​h​e​i​g​h​t​.
			 */
			description: string
			/**
			 * V​a​l​u​e
			 */
			value: string
		}
		diffValueOfUtxos: {
			/**
			 * A​g​e​ ​o​f​ ​C​o​i​n​s
			 */
			title: string
			/**
			 * V​a​l​u​e​ ​o​f​ ​U​T​X​O​s
			 */
			yAxis: string
			/**
			 * T​h​e​ ​d​i​f​f​e​r​e​n​c​e​ ​o​f​ ​U​T​X​O​ ​v​a​l​u​e​ ​g​r​o​u​p​e​d​ ​b​y​ ​b​l​o​c​k​ ​h​e​i​g​h​t​ ​c​o​m​p​a​r​e​d​ ​t​o​ ​t​h​e​ ​p​r​e​v​i​o​u​s​ ​s​l​i​c​e​.​ ​Y​o​u​ ​m​a​y​ ​r​e​a​d​ ​t​h​i​s​ ​a​s​ ​y​ ​P​P​C​ ​w​e​r​e​ ​l​a​s​t​ ​i​n​v​o​l​v​e​d​ ​i​n​ ​a​ ​t​r​a​n​s​a​c​t​i​o​n​ ​b​e​t​w​e​e​n​ ​x​ ​b​l​o​c​k​ ​h​e​i​g​h​t​ ​t​i​m​e​ ​s​l​i​c​e​s​.
			 */
			description: string
			/**
			 * V​a​l​u​e
			 */
			value: string
		}
	}
	footer: {
		/**
		 * P​e​e​r​c​o​i​n​ ​C​h​a​r​t​s
		 */
		charts: string
		/**
		 * P​e​e​r​c​o​i​n​ ​W​e​b​s​i​t​e
		 */
		website: string
	}
}

export type TranslationFunctions = {
	/**
	 * Block
	 */
	block: () => LocalizedString
	/**
	 * No data
	 */
	noData: () => LocalizedString
	/**
	 * Peercoin Unspent Transactions Outputs (UTXOs)
	 */
	title: () => LocalizedString
	/**
	 * Value
	 */
	value: () => LocalizedString
	/**
	 * Last modified: 
	 */
	lastModified: () => LocalizedString
	charts: {
		common: {
			/**
			 * Block Height
			 */
			blockHeight: () => LocalizedString
		}
		nOfUtxos: {
			/**
			 * Cumulative Number UTXOs
			 */
			title: () => LocalizedString
			/**
			 * Number of UTXOs
			 */
			yAxis: () => LocalizedString
			/**
			 * The number of UTXOs grouped by block height. You may read this as y UTXOs have been created before x block height.
			 */
			description: () => LocalizedString
			/**
			 * n
			 */
			value: () => LocalizedString
		}
		valuesOfUtxos: {
			/**
			 * Cumulative Value of UTXOs
			 */
			title: () => LocalizedString
			/**
			 * Value of UTXOs
			 */
			yAxis: () => LocalizedString
			/**
			 * The cumulative value of UTXOs grouped by block height. You may read this as y PPC are unspent since x block height.
			 */
			description: () => LocalizedString
			/**
			 * Value
			 */
			value: () => LocalizedString
		}
		diffValueOfUtxos: {
			/**
			 * Age of Coins
			 */
			title: () => LocalizedString
			/**
			 * Value of UTXOs
			 */
			yAxis: () => LocalizedString
			/**
			 * The difference of UTXO value grouped by block height compared to the previous slice. You may read this as y PPC were last involved in a transaction between x block height time slices.
			 */
			description: () => LocalizedString
			/**
			 * Value
			 */
			value: () => LocalizedString
		}
	}
	footer: {
		/**
		 * Peercoin Charts
		 */
		charts: () => LocalizedString
		/**
		 * Peercoin Website
		 */
		website: () => LocalizedString
	}
}

export type Formatters = {}
