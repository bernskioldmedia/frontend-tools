export default function markerTemplate( markerData ) {

	return `
		<article className="marker-box">
			<div className="marker-box__wrap">
				<div className="marker-box__grid">
					<div className="marker-box__main">
						<span className="marker-box__title">${markerData.title}</span>
						<address className="marker-box__address">
							{markerData.address}
						</address>
					</div>
				</div>
			</div>
		</article>
	`;

}
