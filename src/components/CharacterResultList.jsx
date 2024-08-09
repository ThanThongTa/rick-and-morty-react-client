import { useCharactersStore } from '../hooks/useCharactersStore';
import ImageRadioGroup from './ImageRadioGroup';

/* Komponente für die Anzeige der Charakter Liste */
export default function CharacterResultList() {
	/* Laden der Charaktere */
	const characters = useCharactersStore((state) => state.filteredCharacters);
	/* Funktion zum Auswählen eines Charakters */
	const setSelected = useCharactersStore(
		(state) => state.setCurrentlySelectedCharacter
	);

	/* ermitteln der ID des aktuell ausgewählten Charakters */
	const selectedCharacterId = useCharactersStore(
		(state) => state.currentlySelectedCharacter
	);

	return (
		characters &&
		characters.length > 0 && (
			<section className="character-list character-list__section section-wrapper">
				<ImageRadioGroup
					sectionName="Characters"
					defaultValue={selectedCharacterId}
					onChange={setSelected}
					list={characters}
				/>
			</section>
		)
	);
}
