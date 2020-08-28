import smoothscroll from "smoothscroll-polyfill";
import $ from "jquery";

/**
 * Smooth scrolling to anchors and elements.
 */
export const smoothScroll = {

	/**
	 * Run the initialize function to start
	 * "listening" to events on the page.
	 */
	init: function () {

		smoothscroll.polyfill();

		this.scrollToNextSection();
		this.scrollToAnchor();
		this.scrollToElement();

	},

	/**
	 * Smooth Scrolling to Next Section
	 *
	 * When tagging the "js-scroll-to-next" class on a link, it will
	 * smoothly scroll us to the next available section.
	 */
	scrollToNextSection: function () {
		$(".js-scroll-to-next,.js-hero-arrow-link").click(function (e) {
			e.preventDefault();
			const $nextEl = $(this).parents(".hero,.section").next(".section");
			$nextEl[0].scrollIntoView({
				behavior: "smooth",
			});
		});
	},

	/**
	 * Smooth scrolling to an anchor.
	 * Listens for anchor HTML hrefs and scrolls
	 * smoothly down the page instead of the big jump.
	 */
	scrollToAnchor: function () {

		$("a[href*=\"#\"]")
			// Remove links that don't actually link to anything
			.not("[href=\"#\"]")
			.not("[href=\"#0\"]")
			.on("click", function (event) {
				// On-page links
				if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
					// Figure out element to scroll to
					var $target = $(this.hash);
					$target = $target.length ? $target : $("[name=" + this.hash.slice(1) + "]");
					// Does a scroll target exist?
					if ($target.length) {
						// Only prevent default if animation is actually gonna happen
						event.preventDefault();
						var scrollOffset = $target.offset().top;
						$("html, body").animate({
							scrollTop: scrollOffset,
						}, 500);
					}
				}
			});

	},

	/**
	 * Smooth scrolling to elements.
	 *
	 * Include the "data-scroll-to" data tag to an element,
	 * and we'll listen for click events to it,
	 * and scroll you to the ID specified in the value.
	 */
	scrollToElement: function () {

		$(window).on('click', '*[data-scroll-to]', function (event) {

			// Figure out element to scroll to
			const $target = $($(this).data("scroll-to"));

			// Make sure said element exists
			if ($target.length) {

				event.preventDefault();

				// Get options
				let additionalOffset = $(this).data("additional-offset"),
					scrollSpeed = $(this).data("scroll-speed") ? $(this).data("scroll-speed") : 500;

				// Determine offset
				let originalOffset = $target.offset().top,
					scrollOffset = additionalOffset ? originalOffset + additionalOffset : originalOffset;

				$("html, body").animate({
					scrollTop: scrollOffset,
				}, scrollSpeed);

			}

		});

	}

};
