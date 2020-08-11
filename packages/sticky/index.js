import $ from "jquery";
import Sticky from "sticky-js";

/**
 * Stickies
 */
export const Stickies = {

	defaultOptions: {
		marginTop: 0,
	},

	init: function() {

		const options = {
			...Stickies.defaultOptions,
			...{
				marginTop: Stickies.getHeaderHeight()
			}
		};

		const sticky = new Sticky( ".js--sticky", options );

		// Re-check when we load AJAX content.
		$( window ).on( "ajax-content-loaded", function() {
			sticky.update();
		} );
	},

	getHeaderHeight: function() {
		const header = document.querySelector( ".site-header" );
		return header.scrollHeight;
	}

};
