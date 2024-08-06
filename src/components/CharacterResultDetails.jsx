import { Heading, Label } from 'react-aria-components';
import { useCharactersStore } from '../hooks/useCharactersStore';

/* Komponente für die Anzeige der Details eines Charakters */
export default function CharacterResultDetails() {
	/* ermitteln der ID des aktuell ausgewählten Charakters */
	const selectedCharacterId = useCharactersStore(
		(state) => state.currentlySelectedCharacter
	);
	const characters = useCharactersStore((state) => state.characters);
	/* ermitteln des ausgewählten Charakters */
	const selectedCharacter = characters.find(
		(character) => character.id === selectedCharacterId
	);

	return (
		<>
			{selectedCharacter && (
				<section className="character-details-wrapper">
					<Heading level="4">Character Details</Heading>
					<section className="character-details">
						<img src={selectedCharacter.image} alt={selectedCharacter.name} />
						<p>
							<Label>Name: </Label>
							{selectedCharacter.name}
						</p>
						<p>
							<Label>Status: </Label>
							{selectedCharacter.status}
						</p>
						<p>
							<Label>Species: </Label>
							{selectedCharacter.species}
						</p>
						{selectedCharacter.type && (
							<p>
								<Label>Type: </Label>
								{selectedCharacter.type}
							</p>
						)}
						<p>
							<Label>Gender: </Label>
							{selectedCharacter.gender}
						</p>
						{selectedCharacter.origin && (
							<p>
								<Label>Origin: </Label>
								{selectedCharacter.origin.name}
							</p>
						)}
						{selectedCharacter.location && (
							<p>
								<Label>Location: </Label>
								{selectedCharacter.location.name}
							</p>
						)}
					</section>
				</section>
			)}
		</>
	);
}
