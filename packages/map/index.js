import GoogleMapsApi from "./googleMapsApi";
import markerTemplate from "./markerTemplate";

/**
 * Map
 */
export default class Map {

	/**
	 * Constructor
	 *
	 * @param selector
	 * @param options
	 */
	constructor(selector, options = {}, apiKey = null) {

		this.options = options;
		this.selector = selector;
		this.apiKey = apiKey;

		this.setupMaps();
	}

	/**
	 * Load the API and all the maps on the page.
	 */
	setupMaps() {

		// If we don't have an API key, stop loading and show error.
		if (this.apiKey === undefined) {
			console.error("A Google API key must be set in the settings to be able to load the Google Maps.");
			return;
		}

		const api = new GoogleMapsApi(this.apiKey);
		const maps = document.querySelectorAll(this.selector);

		api.load().then(() => {
			this.loadMaps(maps);
		});

	}

	/**
	 * Render each map.
	 *
	 * @param maps
	 */
	loadMaps(maps) {

		if (!window.google) {
			console.error("Could not properly load the Google API. Map has not been initialized.");
			return;
		}

		maps.forEach((map) => {
			this.renderMap(map);
		});

	}

	/**
	 * Render a single map
	 *
	 * @param mapEl
	 */
	renderMap(mapEl) {
		const markers = mapEl.dataset.markers ? JSON.parse(mapEl.dataset.markers) : {};

		const showControls = ("true" === mapEl.dataset.showControls) ? true : false;

		const mapOptions = {
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: parseFloat(mapEl.dataset.zoom ? mapEl.dataset.zoom : 12),
			center: {
				lat: parseFloat(mapEl.dataset.lat ? mapEl.dataset.lat : 0),
				lng: parseFloat(mapEl.dataset.lng ? mapEl.dataset.lng : 0),
			},
			disableDefaultUI: !showControls,
		};

		const options = {
			...mapOptions,
			...this.options.mapOptions
		};

		const map = new google.maps.Map(mapEl, options);

		/**
		 * Render markers if they exist.
		 */
		if (markers.length === 0) {
			console.info("No markers were found for the map.");
		} else {
			this.renderMarkers(map, markers);
		}

	}

	/**
	 * Render all markers.
	 *
	 * @param map
	 * @param markers
	 */
	renderMarkers(map, markers) {

		const icon = {
			scaledSize: new google.maps.Size(80, 80),
		};

		markers.forEach((markerData) => {

			const template = this.options.markerTemplate ? this.options.markerTemplate(markerData) : markerTemplate(markerData);

			const marker = new google.maps.Marker({
				position: new google.maps.LatLng(markerData.lat, markerData.lng),
				map: map,
				// icon: icon,
				title: markerData.title,
				content: template,
				animation: google.maps.Animation.DROP,
			});

			const infoWindow = new google.maps.InfoWindow();

			this.onMarkerClick(map, marker, infoWindow);

		});

	}

	/**
	 * Adds event listeners for markers.
	 *
	 * @param map
	 * @param marker
	 * @param infoWindow
	 */
	onMarkerClick(map, marker, infoWindow) {

		google.maps.event.addListener(marker, "click", function () {
			infoWindow.setContent(marker.content);
			infoWindow.open(map, marker);
		});

		google.maps.event.addListener(map, "click", function () {
			if (infoWindow) {
				infoWindow.close(map, infoWindow);
			}
		});

	}

}
