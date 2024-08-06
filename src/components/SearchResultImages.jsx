import { useSearchStore } from '../hooks/useSearchStore';
import { SearchCategories } from '../globals/SearchCategories';
import { useSearchQueries } from '../hooks/useSearchQueries';
import { Button } from 'react-aria-components';

/* Komponente für die Anzeige der Bilder der Suchergebnisse */
export default function SearchResultImages() {
	const searchCategory = useSearchStore((state) => state.searchCategory);
	const characters = useSearchStore((state) => state.characters);
	const setSelected = useSearchStore(
		(state) => state.setCurrentlySelectedCharacter
	);
	const { hasResults } = useSearchQueries();
	//Visitor für GetImages
	return (
		<>
			{hasResults() && (
				<section className="search-results__images search-results__section">
					{searchCategory === SearchCategories.Characters &&
						characters.map((character) => (
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
					{searchCategory === SearchCategories.Locations &&
						'Listbox of images of residents of selected location '}
					{searchCategory === SearchCategories.Episodes &&
						'Listbox of images of characters in selected episode'}
				</section>
			)}
		</>
	);
}
