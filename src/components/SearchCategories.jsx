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
			<section className="search-categories__label-section label-section">
				<Label className="search-categories__label">Search Categories</Label>
			</section>
			<Radio
				value="characters"
				className="search-categories__radio search-radio"
			>
				Characters
			</Radio>
			<Radio
				value="locations"
				className="search-categories__radio search-radio"
			>
				Locations
			</Radio>
			<Radio value="episodes" className="search-categories__radio search-radio">
				Episodes
			</Radio>
		</RadioGroup>
	);
}
