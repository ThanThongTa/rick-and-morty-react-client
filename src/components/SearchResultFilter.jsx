/* Komponente für die Anzeige der Filter für die Suchergebnisse */
export default function SearchResultFilter() {
	return (
		<section className="search-results__filters search-results__section">
			Filters for the search depending on the category <br />
			Characters: name, status, species, type, gender <br />
			status: alive, dead, unknown <br />
			gender: female, male, genderless, unknown <br />
			Locations: name, type, dimension <br />
			Episodes: name, episode
			<br />
			Immer und Zustand für State, searchterm und category, currentpage
			<br />
			name as search, Filter as TagGroup, species, type as ListBox
		</section>
	);
}
