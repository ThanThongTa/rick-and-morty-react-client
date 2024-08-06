import { useSearchStore } from '../hooks/useSearchStore';
import { SearchCategories } from '../globals/SearchCategories';
import { useSearchQueries } from '../hooks/useSearchQueries';

/* Komponente für die Anzeige der Bilder der Suchergebnisse */
export default function SearchResultImages() {
	const searchCategory = useSearchStore((state) => state.searchCategory);
	const { hasResults } = useSearchQueries();
	//Visitor für GetImages
	return (
		<>
			{hasResults() && (
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
