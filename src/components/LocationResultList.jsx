import { useLocationsStore } from '../hooks/useLocationsStore';
import TextRadioGroup from './TextRadioGroup';

/* Komponente für die Anzeige der Location Liste */
export default function LocationResultList() {
	/* Laden der Locations */
	const locations = useLocationsStore((state) => state.filteredLocations);
	/* Funktion zum Auswählen einer Location */
	const setSelected = useLocationsStore(
		(state) => state.setCurrentlySelectedLocation
	);

	/* ermitteln der ID der ausgewählten Location */
	const selectedLocationId = useLocationsStore(
		(state) => state.currentlySelectedLocation
	);

	return (
		locations &&
		locations.length > 0 && (
			<section className="location-list location-list__section section-wrapper">
				<TextRadioGroup
					sectionName="Locations"
					defaultValue={selectedLocationId}
					onChange={setSelected}
					list={locations}
				/>
			</section>
		)
	);
}
