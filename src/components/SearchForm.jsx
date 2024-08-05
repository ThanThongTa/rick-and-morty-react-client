import { useQuery } from '@apollo/client';
import {
	Button,
	Input,
	Label,
	Radio,
	RadioGroup,
	SearchField,
} from 'react-aria-components';
import { useSearchStore } from '../hooks/useSearchStore';
import { filterCharactersQuery } from '../data/filterCharactersQuery';
import { SearchCommands } from '../globals/SearchCommands';

export default function SearchForm() {
	const currentPage = 1;
	const currentSearchterm = 'morty';
	const { loading, error, data } = useQuery(filterCharactersQuery, {
		variables: { page: currentPage, name: currentSearchterm },
	});

	// Hooks müssen vor conditionals verwendet werden
	useSearchStore((state) =>
		state.dispatch({
			type: SearchCommands.FilterCharacters,
			data: { ...data, search: currentSearchterm, page: currentPage },
		})
	);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : `{error.message}`</p>;

	return (
		<SearchField role="search" className="search-form">
			<RadioGroup className="search-categories" defaultValue={'characters'}>
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
				<Input className="search-input" placeholder="Search" />
				<Button
					aria-label="Show all"
					className="show-all-button button--ghost"
					excludeFromTabOrder={false}
				>
					Show all
				</Button>
				<Button
					type="button"
					aria-label="Search"
					className="search-button button--ghost"
					excludeFromTabOrder={false}
				>
					Search
				</Button>
			</section>
		</SearchField>
	);
}
