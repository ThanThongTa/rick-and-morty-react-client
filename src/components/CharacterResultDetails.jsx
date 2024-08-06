import { Heading } from 'react-aria-components';
import { useSearchStore } from '../hooks/useSearchStore';

export default function CharacterResultDetails() {
	const selectedCharacterId = useSearchStore(
		(state) => state.newCurrentlySelectedCharacter
	);
	const characters = useSearchStore((state) => state.characters);
	const selectedCharacter = characters.find(
		(character) => character.id === selectedCharacterId
	);

	// console.log(selectedCharacter.episode);
	return (
		<>
			{selectedCharacterId && (
				<div>
					<Heading level="4">Character Details</Heading>
					{selectedCharacter && (
						<div>
							<img src={selectedCharacter.image} alt={selectedCharacter.name} />
							<p>{selectedCharacter.name}</p>
							<p>{selectedCharacter.status}</p>
							<p>{selectedCharacter.species}</p>
							<p>{selectedCharacter.type}</p>
							<p>{selectedCharacter.gender}</p>
							<p>{selectedCharacter.origin.name}</p>
							<p>{selectedCharacter.location.name}</p>
							{/* <p>{selectedCharacter.episode}</p> */}
						</div>
					)}
				</div>
			)}
		</>
	);
}
