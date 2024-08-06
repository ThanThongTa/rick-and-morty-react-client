import { Label, Radio, RadioGroup } from 'react-aria-components';
import { useSearchCategoryQueries } from '../hooks/useSearchCategoryQueries';

/* Komponente für die Auswahl der Such-Kategorien */
export default function SearchCategories() {
	const { changeCategory } = useSearchCategoryQueries();

	return (
		<RadioGroup
			className="search-categories search-parameters-section"
			defaultValue={'characters'}
			onChange={(value) => changeCategory(value)}
		>
			<Label className="search-categories__label">Search Categories:</Label>
			<Radio value="characters" className="search-categories__radio">
				Characters
			</Radio>
			<Radio value="locations" className="search-categories__radio">
				Locations
			</Radio>
			<Radio value="episodes" className="search-categories__radio">
				Episodes
			</Radio>
		</RadioGroup>
	);
}
