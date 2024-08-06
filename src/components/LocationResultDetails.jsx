import { Heading, Label } from 'react-aria-components';
import { useLocationsStore } from '../hooks/useLocationsStore';

/* Komponente für die Details der ausgewählten Location */
export default function LocationResultDetails() {
	/* ermitteln der ID der ausgewählten Location */
	const selectedLocationId = useLocationsStore(
		(state) => state.currentlySelectedLocation
	);
	/* ermitteln der ausgewählten Location */
	const locations = useLocationsStore((state) => state.locations);
	const selectedLocation = locations.find(
		(location) => location.id === selectedLocationId
	);

	return (
		selectedLocation && (
			<section className="location-details-wrapper">
				<Heading level="4">Location Details</Heading>
				<section className="location-details">
					<p>
						<Label>Name: </Label>
						{selectedLocation.name}
					</p>
					<p>
						<Label>Type: </Label>
						{selectedLocation.type}
					</p>
					<p>
						<Label>Dimension: </Label>
						{selectedLocation.dimension}
					</p>
				</section>
			</section>
		)
	);
}
