import { Heading, Label } from 'react-aria-components';
import { useLocationsStore } from '../hooks/useLocationsStore';

export default function LocationResultDetails() {
	const selectedLocationId = useLocationsStore(
		(state) => state.currentlySelectedLocation
	);
	const locations = useLocationsStore((state) => state.locations);
	const selectedLocation = locations.find(
		(location) => location.id === selectedLocationId
	);
	return (
		<>
			{selectedLocation && (
				<div>
					<Heading level="4">Location Details</Heading>
					<div>
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
					</div>
				</div>
			)}
		</>
	);
}
