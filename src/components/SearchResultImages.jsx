import { useSearchStore } from '../hooks/useSearchStore';
import { SearchCategories } from '../globals/SearchCategories';

/* Komponente für die Anzeige der Bilder der Suchergebnisse */
export default function SearchResultImages() {
	const searchCategory = useSearchStore((state) => state.searchCategory);
	const characters = useSearchStore((state) => state.characters);
	//Visitor für GetImages
	return (
		<>
			{characters && characters.length > 0 && (
				<section className="search-results__images search-results__section">
					{searchCategory === SearchCategories.Characters &&
						'Listbox of images to the characters in search results'}
					{searchCategory === SearchCategories.Locations &&
						'Listbox of images of residents of selected location '}
					{searchCategory === SearchCategories.Episodes &&
						'Listbox of images of characters in selected episode'}
				</section>
			)}
		</>
	);
}
