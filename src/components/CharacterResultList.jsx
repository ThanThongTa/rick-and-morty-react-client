import { Heading, ListBox, ListBoxItem } from 'react-aria-components';
import { useCharactersStore } from '../hooks/useCharactersStore';

/* Komponente für die Anzeige der Charakter Liste */
export default function CharacterResultList() {
	/* Laden der Charaktere */
	const characters = useCharactersStore((state) => state.characters);
	/* Funktion zum Auswählen eines Charakters */
	const setSelected = useCharactersStore(
		(state) => state.setCurrentlySelectedCharacter
	);

	return (
		characters &&
		characters.length > 0 && (
			<section className="character-list character-list__section">
				<Heading level="4" className="character-list__heading">
					Character List
				</Heading>
				<ListBox
					aria-label="Characters List"
					selectionMode="single"
					onSelectionChange={(event) => {
						setSelected(event.currentKey);
					}}
				>
					{characters.map((character) => (
						<ListBoxItem
							key={character.id}
							textValue={character.name}
							id={character.id}
						>
							{character.name}
						</ListBoxItem>
					))}
				</ListBox>
			</section>
		)
	);
}
