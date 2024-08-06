import { Heading, Label } from 'react-aria-components';
import { useSearchStore } from '../hooks/useSearchStore';

export default function CharacterResultDetails() {
	const selectedCharacterId = useSearchStore(
		(state) => state.currentlySelectedCharacter
	);
	const characters = useSearchStore((state) => state.characters);
	const selectedCharacter = characters.find(
		(character) => character.id === selectedCharacterId
	);

	return (
		<>
			{selectedCharacter && (
				<div>
					<Heading level="4">Character Details</Heading>
					<div>
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
					</div>
				</div>
			)}
		</>
	);
}
