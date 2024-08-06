import React from 'react';
import { useLocationsStore } from '../hooks/useLocationsStore';
import { Heading } from 'react-aria-components';

export default function LocationResultImages() {
	const selectedLocationId = useLocationsStore(
		(state) => state.currentlySelectedLocation
	);
	const locations = useLocationsStore((state) => state.locations);
	const selectedLocation = locations.find(
		(location) => location.id === selectedLocationId
	);

	return (
		selectedLocation &&
		selectedLocation.residents && (
			<section className="location-images">
				<Heading level="4">Residents of {selectedLocation.name}</Heading>
				{selectedLocation.residents.map((character) => (
					<img
						key={character.id}
						src={character.image}
						alt={character.name}
						width={40}
						height={40}
					/>
				))}
			</section>
		)
	);
}
