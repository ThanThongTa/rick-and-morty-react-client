/* Komponente für die Anzeige von Details der Suchergebnisse */
export default function SearchResultDetails() {
	return (
		<section className="search-results__details">
			details of one selected result <br />
			Characters: image url, name, status, species, type, gender, origin,
			location, episode <br />
			Location: name, type, dimension, residents <br />
			Episodes: name, air date, episode, characters
			<br />
			Hooks: useButton, useListBox, useTagGroup, useRadioGroup, useSearchField,
			useTextField, useProgressBar, (useToggleButton)
			<br />
			useFocusVisible, usePress
		</section>
	);
}
