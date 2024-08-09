import { useLocationsStore } from '../hooks/useLocationsStore';

/* Komponente für die Bilder der Residents der ausgewählten Location */
export default function LocationResultImages() {
	const selectedLocationId = useLocationsStore(
		(state) => state.currentlySelectedLocation
	);
	const locations = useLocationsStore((state) => state.filteredLocations);
	const selectedLocation = locations.find(
		(location) => location.id === selectedLocationId
	);

	return (
		selectedLocation &&
		selectedLocation.residents && (
			<section className="location-images section-wrapper">
				<span className="location-images__heading section-label">
					Residents of{' '}
					<span className="location__name">{selectedLocation.name}</span>
				</span>
				<section className="location-images__wrapper">
					{selectedLocation.residents.map((character) => (
						<section key={character.id} className="location-images__item">
							<img
								className="location-image"
								key={character.id}
								src={character.image}
								alt={character.name}
							/>
							<section className="location-image__name">
								{character.name}
							</section>
						</section>
					))}
				</section>
			</section>
		)
	);
}
