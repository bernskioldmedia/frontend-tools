import $ from "jquery";

/**
 * Overlay Navigation
 */
export const overlayNavigation = {

	init: function() {
		this.toggle();
		this.toggleSubMenu();
	},

	toggle: function() {
		$( ".js-overlay-nav-trigger" ).click( function( e ) {
			e.preventDefault();

			if ( $( this ).hasClass( "is-active" ) ) {
				$( this ).removeClass( "is-active" );
				$( this ).find( ".menu-toggle" ).removeClass( "is-active" );
				$( "body" ).removeClass( "overlay-menu-is-active" );
			} else {
				$( this ).addClass( "is-active" );
				$( this ).find( ".menu-toggle" ).addClass( "is-active" );
				$( "body" ).addClass( "overlay-menu-is-active" );
			}

		} );
	},

	toggleSubMenu() {

		$( ".overlay-navigation .menu > .menu-item.menu-item-has-children" ).click( function( e ) {
			e.preventDefault();

			const $menuItem = $( this );

			if ( $menuItem.hasClass( "has-open-sub-menu" ) ) {
				$menuItem.removeClass( "has-open-sub-menu" );
			} else {
				$menuItem.addClass( "has-open-sub-menu" );
			}

		} );

	}

};
