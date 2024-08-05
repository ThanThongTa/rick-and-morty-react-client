export default function SearchResult() {
	return (
		<section className="search-results">
			<section className="search-results__filters">
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
			<section className="search-results__info">
				Info about the search results, pages, count(, prev, next)
				<br />
				ProgressBar
			</section>
			<section className="search-results__list">
				Listbox of search results
				<br />
				Infinite scrolling list for characters
				<br />
				Infinite scrolling carousel for locations
				<br />
				Paging for episodes
			</section>
			<section className="search-results__images">
				Listbox of images to the characters search results <br />
				Listbox of images of residents of locations <br />
				Listbox of images of characters in an episode
				<br />
				Zusätzliche Design Patterns: <br />
				Command für GetAll & Filter, Strategy für Filter der nach Kategorien,
				Visitor für GetImages
			</section>
			<section className="search-results__details">
				details of one selected result <br />
				Characters: image url, name, status, species, type, gender, origin,
				location, episode <br />
				Location: name, type, dimension, residents <br />
				Episodes: name, air date, episode, characters
				<br />
				Hooks: useButton, useListBox, useTagGroup, useRadioGroup,
				useSearchField, useTextField, useProgressBar, (useToggleButton)
				<br />
				useFocusVisible, usePress
			</section>
		</section>
	);
}
