import Flickity from "flickity";

/**
 * Carousel
 */
export default class Carousel {

	constructor( selector = ".js--carousel,.js-carousel", options = {} ) {

		this.selector = selector;
		this.options  = options;

		this.setupCarousels();

		this.setupCarousel = this.setupCarousel.bind( this );

	}

	getDefaultOptions() {
		return {
			cellAlign: "left",
			percentPosition: true,
			watchCSS: true,
			wrapAround: true,
			contain: true,
			imagesLoaded: true,
			pageDots: false,
			lazyLoad: true,
			bgLazyLoad: true,
			initialIndex: ".is-initial-carousel-selected"
		};
	}

	getOptions( dataOptions = {} ) {
		return { ...this.getDefaultOptions(), ...this.options, ...dataOptions };
	}

	setupCarousels() {

		const carouselElements = document.querySelectorAll( this.selector );

		if ( carouselElements.length ) {

			carouselElements.forEach( ( carousel ) => {
				this.setupCarousel( carousel );
			} );

		}

	}

	/**
	 * Start a carousel.
	 *
	 * @param carousel
	 */
	setupCarousel( carousel ) {

		/**
		 * We set the carousel attributes as a JSON data attribute
		 * named "data-carousel-settings" on the slider.
		 */
		const carouselArgs = this.getOptions( carousel.dataset.carouselSettings );

		const carouselInstance = new Flickity( carousel, carouselArgs );

		// Fade in as a loader.
		carousel.classList.add( "first-item-selected" );

		/**
		 * Resize on timer to account for delayed loading of elements.
		 */
		setTimeout( function() {
			carouselInstance.resize();
		}, 500 );
		setTimeout( function() {
			carouselInstance.resize();
		}, 1000 );
		setTimeout( function() {
			carouselInstance.resize();
		}, 1500 );

		/**
		 * If the user clicks on a carousel item that isn't active
		 * or isn't showing, we want to make it active.
		 */
		carouselInstance.on( "staticClick", function( event, pointer, cellElement, cellIndex ) {
			if ( cellIndex !== undefined ) {
				carouselInstance.on( "select", cellIndex );
			}
		} );

		carouselInstance.on( "change", function( index ) {

			const totalItems = carousel.querySelectorAll( ".carousel-item" ).length;

			carousel.classList.remove( "first-item-selected", "last-item-selected" );

			if ( index === 0 ) {
				carousel.classList.add( "first-item-selected" );
			} else if ( index + 1 === totalItems ) {
				carousel.classList.add( "last-item-selected" );
			}

			const eventChangedItem = new Event( "bm.carousels.changedItem", carouselInstance );
			eventChangedItem.dispatchEvent( event );

		} );

	}

}
