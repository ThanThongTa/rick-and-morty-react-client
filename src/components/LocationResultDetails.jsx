import { useLocationsStore } from '../hooks/useLocationsStore';

/* Komponente für die Details der ausgewählten Location */
export default function LocationResultDetails() {
	/* ermitteln der ID der ausgewählten Location */
	const selectedLocationId = useLocationsStore(
		(state) => state.currentlySelectedLocation
	);
	/* ermitteln der ausgewählten Location */
	const locations = useLocationsStore((state) => state.filteredLocations);
	const selectedLocation = locations.find(
		(location) => location.id === selectedLocationId
	);

	return (
		selectedLocation && (
			<section className="location-details-wrapper section-wrapper">
				<span className="location-details__heading section-label">
					Location Details
				</span>
				<section className="location-details">
					<p>
						<span className={'location-details__label'}>Name: </span>
						<span className={'location-details__value'}>
							{selectedLocation.name}
						</span>
					</p>
					<p>
						<span className={'location-details__label'}>Type: </span>
						<span className={'location-details__value'}>
							{selectedLocation.type}
						</span>
					</p>
					{selectedLocation.dimension && (
						<p>
							<span className={'location-details__label'}>Dimension: </span>
							<span className={'location-details__value'}>
								{selectedLocation.dimension}
							</span>
						</p>
					)}
				</section>
			</section>
		)
	);
}
