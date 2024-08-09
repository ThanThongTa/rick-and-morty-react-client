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
						<section className="character-details__info">
							<span className={'character-details__label'}>Name: </span>
							<span className={'character-details__value'}>
								{selectedCharacter.name}
							</span>
						</section>
						<section className="character-details__info">
							<span className={'character-details__label'}>Status: </span>
							<span className={'character-details__value'}>
								{selectedCharacter.status}
							</span>
						</section>
						<section className="character-details__info">
							<span className={'character-details__label'}>Species: </span>
							<span className={'character-details__value'}>
								{selectedCharacter.species}
							</span>
						</section>
						{selectedCharacter.type && (
							<section className="character-details__info">
								<span className={'character-details__label'}>Type: </span>
								<span className={'character-details__value'}>
									{selectedCharacter.type}
								</span>
							</section>
						)}
						<section className="character-details__info">
							<span className={'character-details__label'}>Gender: </span>
							<span className={'character-details__value'}>
								{selectedCharacter.gender}
							</span>
						</section>
						{selectedCharacter.origin && (
							<section className="character-details__info">
								<span className={'character-details__label'}>Origin: </span>
								<span className={'character-details__value'}>
									{selectedCharacter.origin.name}
								</span>
							</section>
						)}
						{selectedCharacter.location && (
							<section className="character-details__info">
								<span className={'character-details__label'}>Location: </span>
								<span className={'character-details__value'}>
									{selectedCharacter.location.name}
								</span>
							</section>
						)}
					</section>
				</section>
			)}
		</>
	);
}
