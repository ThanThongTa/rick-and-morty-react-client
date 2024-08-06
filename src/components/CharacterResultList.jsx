import { Heading, ListBox, ListBoxItem } from 'react-aria-components';
import { useSearchStore } from '../hooks/useSearchStore';

export default function CharacterResultList() {
	const characters = useSearchStore((state) => state.characters);
	const setSelected = useSearchStore(
		(state) => state.setCurrentlySelectedCharacter
	);

	const changeSelected = (event) => {
		setSelected(event.currentKey);
	};

	//Infinite vertical scrolling list for characters
	return (
		<>
			{characters && characters.length > 0 && (
				<section className="character-list character-list__section">
					<Heading level="4" className="character-list__heading">
						Character List{' '}
					</Heading>
					{!characters && 'No characters found'}
					{characters && (
						<>
							<ListBox
								aria-label="Characters List"
								selectionMode="single"
								onSelectionChange={changeSelected}
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
						</>
					)}
				</section>
			)}
		</>
	);
}
