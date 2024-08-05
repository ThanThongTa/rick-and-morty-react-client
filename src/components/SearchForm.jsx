import {
	Button,
	Input,
	Label,
	Radio,
	RadioGroup,
	SearchField,
} from 'react-aria-components';
import { useSearchQueries } from '../hooks/useSearchQueries';

export default function SearchForm() {
	const { search, setSearch, changeCategory, queryAll, filterAll } =
		useSearchQueries();

	return (
		<SearchField role="search" className="search-form">
			<RadioGroup
				className="search-categories"
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
			<section className="search-inputs">
				<Label className="Search Input">Search Input</Label>
				<Button
					aria-label="Show all"
					className="show-all-button button--ghost"
					excludeFromTabOrder={false}
					onPress={() => queryAll()}
				>
					Show all
				</Button>
				<Input
					className="search-input"
					placeholder="Search"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
				<Button
					type="button"
					aria-label="Search"
					className="search-button button--ghost"
					excludeFromTabOrder={false}
					onPress={() => filterAll()}
				>
					Search
				</Button>
			</section>
		</SearchField>
	);
}
