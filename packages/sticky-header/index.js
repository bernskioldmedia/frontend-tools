import $ from "jquery";

/**
 * StickyHeader
 */
export const StickyHeader = {

	init: function() {

		StickyHeader.maybeIsStuck();

		$( window ).on( "scroll resize-end ajax-content-loaded did-interval-scroll", function() {
			StickyHeader.maybeIsStuck();
		} );

	},

	maybeIsStuck: function() {

		let currentScrollPosition = window.pageYOffset;

		const siteHeader = document.querySelector( ".js--sticky-header" );

		if ( currentScrollPosition > 0 ) {
			siteHeader.classList.add( "is-stuck" );
		} else {
			siteHeader.classList.remove( "is-stuck" );
		}

	}

};
