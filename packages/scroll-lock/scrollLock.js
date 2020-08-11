import $ from "jquery";

/**
 * ScrollLock Main Module
 *
 * This needs to be instantiated globally
 * for the module to work.
 */
export default function ScrollLock() {

	window.scrollLocked   = false;
	window.prevScroll     = {
		left: $( window ).scrollLeft(),
		top: $( window ).scrollTop()
	};
	window.prevLockStyles = {};
	window.lockStyles     = {
		"overflow-y": "scroll",
		"position": "fixed",
		"width": "100%"
	};

	saveStyles();

}

/**
 * Save Styles to DOM
 */
function saveStyles() {

	const styleAttr = $( "html" ).attr( "style" );
	let styleStrs   = styleAttr ? styleAttr.split( /;\s/ ) : [];
	let styleHash   = {};

	$.each( styleStrs, function serializeStyleProp( styleString ) {

		if ( ! styleString ) {
			return;
		}

		const keyValue = styleString.split( /\s:\s/ );

		if ( keyValue.length < 2 ) {
			return;
		}

		styleHash[ keyValue[ 0 ] ] = keyValue[ 1 ];
	} );

	$.extend( window.prevLockStyles, styleHash );

}

/**
 * Lock the screen.
 */
function lock() {

	let appliedLock = {};

	if ( window.scrollLocked ) {
		return;
	}

	// Save scroll state and styles
	window.prevScroll = {
		left: $( window ).scrollLeft(),
		top: $( window ).scrollTop()
	};

	saveStyles();

	// Compose our applied CSS, with scroll state as styles
	$.extend( appliedLock, window.lockStyles, {
		"left": -window.prevScroll.left + "px",
		"top": -window.prevScroll.top + "px"
	} );

	// Then lock styles and state
	$( "html" ).css( appliedLock );
	$( window ).scrollLeft( 0 ).scrollTop( 0 );

	window.scrollLocked = true;

}

/**
 * Unlock the screen.
 */
function unlock() {

	if ( ! window.scrollLocked ) {
		return;
	}

	// Revert styles and state
	$( "html" ).attr( "style", $( "<x>" ).css( window.prevLockStyles ).attr( "style" ) || "" );
	$( window ).scrollLeft( window.prevScroll.left ).scrollTop( window.prevScroll.top );

	window.scrollLocked = false;

}

/**
 * Set Scroll Look (true/false)
 *
 * @param activate
 */
export function setScrollLock( activate = true ) {

	if ( activate ) {
		lock();
	} else {
		unlock();
	}
}

/**
 * Toggles the scroll lock based on the current state.
 */
export function toggleScrollLock() {

	if ( window.scrollLocked ) {
		unlock();
	} else {
		lock();
	}

}
