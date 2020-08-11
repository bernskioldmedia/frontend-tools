import { CountUp } from "countup.js";

/**
 * Counter
 */
export default class Counter {

	constructor( selector = ".js-counter,.statistic-title > strong", options = {} ) {

		this.selector = selector;
		this.options  = options;
		this.elements = [];

		this.setupCounters();
		this.initCounters();

		// When we scroll the window, we want to keep
		// checking if counters are in viewport.
		window.addEventListener( "scroll", () => {
			this.initCounters();
		} );

		window.addEventListener( "bm.carousels.changedItem", ( event, carouselInstance ) => {
			this.initCounters( carouselInstance.selectedElement );
		} );

		this.initCounters = this.initCounters.bind( this );
		this.setupItem    = this.setupItem.bind( this );

	}

	setupCounters() {
		const elements = document.querySelectorAll( this.selector );

		elements.forEach( ( counter ) => {
			this.setupItem( counter );
		} );
	}

	initCounters( specificEl = null ) {

		this.elements.forEach( ( counter ) => {

			let initSpecific = false;
			let number       = null;

			if ( specificEl ) {
				initSpecific = true;
				number       = specificEl.querySelector( this.selector );
			}

			if ( false !== initSpecific && number === counter.el ) {
				counter.start();
			} else if ( this.isInViewport( counter.el ) ) {
				counter.start();
			}
		} );

	}

	getOptions( dataOptions ) {
		const separatorThousand = document.querySelector( "body" ).dataset.thousandSeparator;
		const separatorDecimal  = document.querySelector( "body" ).dataset.decimalSeparator;

		return {
			...{
				decimal: separatorDecimal,
				separator: separatorThousand,
			},
			...this.options,
			...dataOptions,
		};
	}

	setupItem( counter ) {

		/**
		 * Get the value in the HTML tag as the counter value.
		 *
		 * @type {number}
		 */
		const strippedValue = counter.innerText.replace( this.options.separator, "" ).replace( this.options.decimal, "." );

		const counterValue = parseFloat( strippedValue );

		const decimalOptions = {
			decimalPlaces: counterValue.countDecimals()
		};

		/**
		 * We set the counter attributes as a JSON data attribute
		 * named "data-counter-settings" on the slider.
		 */
		const options = this.getOptions( {
			...decimalOptions,
			...counter.dataset.counterSettings
		} );

		/**
		 * Set up the counter.
		 * @type {CountUp}
		 */
		const countUp = new CountUp( counter, counterValue, options );

		/**
		 * Add the counter an array.
		 */
		this.elements.push( countUp );

		return countUp;

	}

	isInViewport( elem ) {
		const bounding = elem.getBoundingClientRect();

		return (
			bounding.top >= 0 &&
			bounding.left >= 0 &&
			bounding.bottom <= ( window.innerHeight || document.documentElement.clientHeight ) &&
			bounding.right <= ( window.innerWidth || document.documentElement.clientWidth )
		);
	}

}

Number.prototype.countDecimals = function() {
	if ( Math.floor( this.valueOf() ) === this.valueOf() ) {
		return 0;
	}
	return this.toString().split( "." )[ 1 ].length || 0;
};
