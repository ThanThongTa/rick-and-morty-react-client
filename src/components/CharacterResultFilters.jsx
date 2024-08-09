import { useCharactersStore } from '../hooks/useCharactersStore';
import SearchRadioGroup from './SearchRadioGroup';

/* Komponente für die Einstellungen der Charaktersuche */
export default function CharacterResultFilters() {
	const characters = useCharactersStore((state) => state.filteredCharacters);
	/* Ermitteln der Werte für die Species und Types */
	const species = Array.from(
		new Set(characters.map((character) => character.species))
	);
	const types = Array.from(
		new Set(characters.map((character) => character.type))
	);
	const status = Array.from(
		new Set(characters.map((character) => character.status))
	);
	const genders = Array.from(
		new Set(characters.map((character) => character.gender))
	);

	/* Ermitteln der ausgewählten Werte aus Zustand */
	const selectedGender = useCharactersStore(
		(state) => state.currentlySelectedGender
	);
	const selectedStatus = useCharactersStore(
		(state) => state.currentlySelectedStatus
	);
	const selectedSpecies = useCharactersStore(
		(state) => state.currentlySelectedSpecies
	);
	const selectedType = useCharactersStore(
		(state) => state.currentlySelectedType
	);
	/* Ermitteln der Set-Funktionen aus Zustand */
	const setSelectedType = useCharactersStore(
		(state) => state.setCurrentlySelectedType
	);
	const setSelectedGender = useCharactersStore(
		(state) => state.setCurrentlySelectedGender
	);
	const setSelectedStatus = useCharactersStore(
		(state) => state.setCurrentlySelectedStatus
	);
	const setSelectedSpecies = useCharactersStore(
		(state) => state.setCurrentlySelectedSpecies
	);

	return (
		<section className="character-filters-wrapper section-wrapper">
			<span className="character-filters__heading section-label">
				Character Filters
			</span>
			{/* Radio-Group für die Species */}
			<SearchRadioGroup
				sectionName="Species"
				defaultValue={selectedSpecies}
				onChange={setSelectedSpecies}
				list={species}
			/>
			{/* Ende Radio-Group für die Species */}

			{/* Radio-Group für die Types der Locations */}
			<SearchRadioGroup
				sectionName="Types"
				defaultValue={selectedType}
				onChange={setSelectedType}
				list={types}
			/>
			{/* Ende Radio-Group für die Types der Locations */}
			{/* Radio-Group für den Status */}
			<SearchRadioGroup
				sectionName="Status"
				defaultValue={selectedStatus}
				onChange={setSelectedStatus}
				list={status}
			/>
			{/* Ende Radio-Group für den Status */}
			{/* Radio-Group für den Gender */}
			<SearchRadioGroup
				sectionName="Gender"
				defaultValue={selectedGender}
				onChange={setSelectedGender}
				list={genders}
			/>
			{/* Ende Radio-Group für den Gender */}
		</section>
	);
}
