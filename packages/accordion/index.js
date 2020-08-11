import BadgerAccordion from "badger-accordion";

/**
 * Accordions
 */
export default class Accordion {

	constructor( selector = ".js--accordion", options = {} ) {

		this.selector = selector;
		this.options  = options;

		this.setupAccordions();

	}

	setupAccordions() {
		const accordions = document.querySelectorAll( this.selector );

		Array.from( accordions ).map( accordion => {
			this.setupAccordion( accordion );
		} );
	}

	getDefaultOptions() {
		return {
			activeClass: "is-active",
			headerClass: ".js--accordion-header-trigger",
			panelClass: ".js--accordion-panel",
			panelInnerClass: ".js--accordion-panel-content",
			hiddenClass: "is-hidden",
			initialisedClass: "is-initialized",
		};
	}

	getOptions( dataOptions = {} ) {
		return { ...this.getDefaultOptions(), ...this.options, ...dataOptions };
	}

	setupAccordion( accordion ) {

		/**
		 * Get from the data options whether we allow multiple
		 * panels to be open at the same time. (data-multiple="true")
		 *
		 * @type {boolean}
		 */
		const openMultiple = ( accordion.dataset.multiple === "true" );

		/**
		 * Check whether we should have the first panel open by default when
		 * the accordion loads. By default, all are closed. (data-first-open="true")
		 *
		 * @type {array}
		 */
		const openOnLoad = ( accordion.dataset.firstOpen === "true" ? [ 0 ] : [] );

		/**
		 * Get the param options and merge with the default options.
		 *
		 * @type {object}
		 */
		const options = this.getOptions( {
			openMultiplePanels: openMultiple,
			openHeadersOnLoad: openOnLoad,
		} );

		const initAccordion = new BadgerAccordion( accordion, options );

	}

}
