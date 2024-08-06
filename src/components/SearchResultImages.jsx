/* Komponente für die Anzeige der Bilder der Suchergebnisse */
export default function SearchResultImages() {
	return (
		<section className="search-results__images search-results__section">
			Listbox of images to the characters search results <br />
			Listbox of images of residents of locations <br />
			Listbox of images of characters in an episode
			<br />
			Zusätzliche Design Patterns: <br />
			Command für GetAll & Filter, Strategy für Filter der nach Kategorien,
			Visitor für GetImages
		</section>
	);
}
