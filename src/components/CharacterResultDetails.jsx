import { useCharactersStore } from '../hooks/useCharactersStore';

/* Komponente für die Anzeige der Details eines Charakters */
export default function CharacterResultDetails() {
	/* ermitteln der ID des aktuell ausgewählten Charakters */
	const selectedCharacterId = useCharactersStore(
		(state) => state.currentlySelectedCharacter
	);
	const characters = useCharactersStore((state) => state.filteredCharacters);
	/* ermitteln des ausgewählten Charakters */
	const selectedCharacter = characters.find(
		(character) => character.id === selectedCharacterId
	);

	return (
		<>
			{selectedCharacter && (
				<section className="character-details-wrapper section-wrapper">
					<span className="character-details__heading section-label">
						Character Details
					</span>
					<section className="character-details">
						<img
							className="character-details__image"
							src={selectedCharacter.image}
							alt={selectedCharacter.name}
						/>
						<p>
							<span className={'character-details__label'}>Name: </span>
							<span className={'character-details__value'}>
								{selectedCharacter.name}
							</span>
						</p>
						<p>
							<span className={'character-details__label'}>Status: </span>
							<span className={'character-details__value'}>
								{selectedCharacter.status}
							</span>
						</p>
						<p>
							<span className={'character-details__label'}>Species: </span>
							<span className={'character-details__value'}>
								{selectedCharacter.species}
							</span>
						</p>
						{selectedCharacter.type && (
							<p>
								<span className={'character-details__label'}>Type: </span>
								<span className={'character-details__value'}>
									{selectedCharacter.type}
								</span>
							</p>
						)}
						<p>
							<span className={'character-details__label'}>Gender: </span>
							<span className={'character-details__value'}>
								{selectedCharacter.gender}
							</span>
						</p>
						{selectedCharacter.origin && (
							<p>
								<span className={'character-details__label'}>Origin: </span>
								<span className={'character-details__value'}>
									{selectedCharacter.origin.name}
								</span>
							</p>
						)}
						{selectedCharacter.location && (
							<p>
								<span className={'character-details__label'}>Location: </span>
								<span className={'character-details__value'}>
									{selectedCharacter.location.name}
								</span>
							</p>
						)}
					</section>
				</section>
			)}
		</>
	);
}
