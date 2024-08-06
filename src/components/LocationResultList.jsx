import { Heading, ListBox, ListBoxItem } from 'react-aria-components';
import { useLocationsStore } from '../hooks/useLocationsStore';

/* Komponente für die Anzeige der Location Liste */
export default function LocationResultList() {
	/* Laden der Locations */
	const locations = useLocationsStore((state) => state.locations);
	/* Funktion zum Auswählen einer Location */
	const setSelected = useLocationsStore(
		(state) => state.setCurrentlySelectedLocation
	);

	//Infinite scrolling carousel for locations
	return (
		locations &&
		locations.length > 0 && (
			<section className="location-list location-list__section">
				<Heading level="4" className="location-list__heading">
					Location List{' '}
				</Heading>
				<ListBox
					aria-label="Locations List"
					selectionMode="single"
					onSelectionChange={(event) => {
						setSelected(event.currentKey);
					}}
				>
					{locations.map((location) => (
						<ListBoxItem
							key={location.id}
							textValue={location.name}
							id={location.id}
						>
							{location.name}
						</ListBoxItem>
					))}
				</ListBox>
			</section>
		)
	);
}
