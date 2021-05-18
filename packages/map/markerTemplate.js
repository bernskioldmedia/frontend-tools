export default function markerTemplate( markerData ) {
	return `
		<article className="marker-box">
			<div className="marker-box__wrap">
				<div className="marker-box__grid">
					<div className="marker-box__main">
						<address className="marker-box__address">
							${markerData.content}
						</address>
					</div>
				</div>
			</div>
		</article>
	`;

}
