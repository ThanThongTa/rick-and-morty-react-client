import { useLocationsStore } from '../hooks/useLocationsStore';
import SearchRadioGroup from './SearchRadioGroup';

/* Komponente für die Anzeige der Filter für die Locations */
export default function LocationResultFilters() {
	/* Auslesen aktueller Werte aus Zustand */
	const allLocations = useLocationsStore((state) => state.filteredLocations);
	const selectedType = useLocationsStore(
		(state) => state.currentlySelectedType
	);
	const selectedDimension = useLocationsStore(
		(state) => state.currentlySelectedDimension
	);
	/* Ermitteln der Set-Funktionen aus Zustand */
	const setSelectedType = useLocationsStore(
		(state) => state.setCurrentlySelectedType
	);
	const setSelectedDimension = useLocationsStore(
		(state) => state.setCurrentlySelectedDimension
	);

	/* Ermitteln der Types aus den Locations */
	const types = Array.from(
		new Set(allLocations.map((location) => location.type))
	);

	/* Ermitteln der Dimensions aus den Locations */
	const dimensions = Array.from(
		new Set(allLocations.map((location) => location.dimension))
	);

	return (
		<section className="location-filters-wrapper section-wrapper">
			<span className="character-filters__heading section-label">
				Location Filters
			</span>
			{/* Radio-Group für die Types der Locations */}
			<SearchRadioGroup
				sectionName="Types"
				defaultValue={selectedType}
				onChange={setSelectedType}
				list={types}
			/>
			{/* Ende Radio-Group für die Types */}
			{/* Radio-Group für die Dimensions der Locations */}
			<SearchRadioGroup
				sectionName="Dimensions"
				defaultValue={selectedDimension}
				onChange={setSelectedDimension}
				list={dimensions}
			/>
			{/* Ende Radio-Group für die Dimensions */}
		</section>
	);
}
