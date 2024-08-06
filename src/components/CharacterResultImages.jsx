import { Button, Heading } from 'react-aria-components';
import { useCharactersStore } from '../hooks/useCharactersStore';

/* Komponente für die Anzeige der Charakterbilder */
export default function CharacterResultImages() {
	const characters = useCharactersStore((state) => state.characters);
	const setSelected = useCharactersStore(
		(state) => state.setCurrentlySelectedCharacter
	);
	return (
		<section className="character-results__images character-results__section">
			<Heading level="4">Character Images</Heading>
			{characters.map((character) => (
				<Button
					key={character.id}
					onPress={() => setSelected(character.id)}
					onFocus={() => setSelected(character.id)}
				>
					<img
						src={character.image}
						alt={character.name}
						width={40}
						height={40}
					/>
				</Button>
			))}
		</section>
	);
}
