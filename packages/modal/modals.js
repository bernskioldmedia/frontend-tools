import { toggleScrollLock } from "@bernskioldmedia/scroll-lock";

/**
 * Currently Active Modal
 *
 * @type {null|element}
 */
let activeModal = null;

/**
 * Modal Open Class
 *
 * @type {string}
 */
const MODAL_OPEN_CLASS = "is-open";

/**
 * Modal Closed Class
 *
 * @type {string}
 */
const MODAL_CLOSED_CLASS = "is-closed";

/**
 * Modal Main Function
 *
 * @constructor
 */
export default function Modals() {
	addOpenEventListeners();
	addCloseEventListeners();
}

/**
 * Get Modal Links
 *
 * @returns {NodeListOf<Element>}
 */
export function getModalLinks() {

	const prefix = "#modal-";
	const links  = document.querySelectorAll( `*[href^="${prefix}"]` );

	return links;

}

/**
 * Add Event Listeners to Modal Open Links
 */
function addOpenEventListeners() {

	Array.from( getModalLinks() ).forEach( ( link ) => {

		const modalId = link.getAttribute( "href" );
		const modalEl = document.querySelector( modalId );

		link.addEventListener( "click", ( e ) => {
			e.preventDefault();
			openModal( modalEl );
		} );
	} );

}

/**
 * Add Event Listeners to Close Modals
 */
function addCloseEventListeners() {

	/**
	 * Clicking on the close button wlil close the modal.
	 */
	const closeButtons = document.querySelectorAll( ".js--modal-close" );

	Array.from( closeButtons ).forEach( ( button ) => {
		button.addEventListener( "click", ( e ) => {
			e.preventDefault();
			closeModal( activeModal );
		} );
	} );

	/**
	 * CLicking anywhere outside the modal content will close the modal.
	 */
	window.addEventListener( "click", ( e ) => {
		if ( e.target.classList.contains( "modal" ) ) {
			closeModal( e.target );
		}
	} );

	/**
	 * The escape key will close the modal.
	 */
	document.addEventListener( "keydown", ( e ) => {
		if ( e.key === "Escape" || e.key === "Esc" ) {
			closeModal( activeModal );
		}
	} );

}

/**
 * Open a modal
 *
 * @param element
 */
export function openModal( element ) {
	element.classList.remove( MODAL_CLOSED_CLASS );
	element.classList.add( MODAL_OPEN_CLASS );
	activeModal = element;
	toggleScrollLock();
}

/**
 * Close a modal
 *
 * @param element
 */
export function closeModal( element ) {
	element.classList.remove( MODAL_OPEN_CLASS );
	element.classList.add( MODAL_CLOSED_CLASS );
	activeModal = null;
	toggleScrollLock();
}
