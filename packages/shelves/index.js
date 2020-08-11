import $ from "jquery";

/**
 * Shelves
 */
export const Shelves = {

	/**
	 * An array of all found shelves on the page.
	 */
	shelves: [],

	/**
	 * Array of all menu items in the shelf menu.
	 */
	menuItems: [],

	/**
	 * Init the shelves.
	 */
	init: function() {

		this.setupMenuItems();
		this.setupShelves();
		this.addMenuListener();

		/**
		 * When we mouse out of the header, close all shelves.
		 */
		$( ".js--site-header" ).mouseleave( function() {
			Shelves.closeShelves();
		} );
	},

	/**
	 * Load all the shelves on the page.
	 */
	setupShelves() {
		Shelves.shelves = document.querySelectorAll( ".shelf" );
	},

	setupMenuItems() {
		Shelves.menuItems = document.querySelectorAll( ".js--shelf-navigation .menu-item" );
	},

	/**
	 * Add an event listener for every menu item on the page and trigger
	 * the on hover callback when we hover over a menu item.
	 */
	addMenuListener: function() {
		Shelves.menuItems.forEach( ( menuItem ) => {
			menuItem.addEventListener( "mouseover", Shelves.onMenuItemHover );
		} );
	},

	/**
	 * Get the menu ID (number) from the element ID (string).
	 *
	 * @param menuItem
	 * @returns {*}
	 */
	getMenuId: function( menuItem ) {
		const parts = menuItem.id.split( "-" );
		return parts[ parts.length - 1 ];
	},

	/**
	 * Callback when the user hovers over a menu item.
	 * Provided we have a valid menu ID, we check if
	 * we are able to open a shelf.
	 *
	 * @param event
	 */
	onMenuItemHover: function( event ) {
		const menuItem = event.target;
		console.log( menuItem );

		const menuId = Shelves.getMenuId( menuItem );

		if ( menuId ) {

			const shelf = document.querySelector( "#shelf-" + menuId );

			if ( shelf ) {
				Shelves.openShelf( shelf );
				menuItem.classList.add( "has-open-shelf" );
				document.body.classList.add( "has-open-menu-shelf" );
			} else {
				Shelves.closeShelves();
			}

		} else {
			Shelves.closeShelves();
		}

	},

	/**
	 * Open the shelf.
	 *
	 * @param shelf
	 */
	openShelf: function( shelf ) {

		// If we are changing to another menu item and have a shelf
		// currently open, close it first. Otherwise both stays open.
		if ( ! shelf.classList.contains( "is-open" ) ) {
			Shelves.closeShelves();
		}

		shelf.classList.add( "is-open" );

	},

	/**
	 * Loop through and close all shelves on the page.
	 */
	closeShelves: function() {

		document.body.classList.remove( "has-open-menu-shelf" );

		Shelves.shelves.forEach( ( shelf ) => {
			shelf.classList.remove( "is-open" );
		} );

		Shelves.menuItems.forEach( ( menuItem ) => {
			menuItem.classList.remove( "has-open-shelf" );
		} );

	},

};
