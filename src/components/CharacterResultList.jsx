import { Heading, ListBox, ListBoxItem } from 'react-aria-components';
import { useSearchStore } from '../hooks/useSearchStore';
import { useState } from 'react';

export default function CharacterResultList() {
	const characters = useSearchStore((state) => state.characters);
	const setSelected = useSearchStore(
		(state) => state.setCurrentlySelectedCharacter
	);

	const [selected] = useState([]);

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
								selectedKeys={selected}
								onSelectionChange={setSelected}
							>
								{characters.map((character) => (
									<ListBoxItem
										key={character.id + character.name}
										textValue={character.name}
										id={character}
									>
										{character.name}
									</ListBoxItem>
								))}
							</ListBox>
							<p>Current selection: {[...selected].join(', ')}</p>
						</>
					)}
				</section>
			)}
		</>
	);
}
