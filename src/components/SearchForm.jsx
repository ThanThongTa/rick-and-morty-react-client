import { useLazyQuery } from '@apollo/client';
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
import { useEffect, useState } from 'react';
import { SearchCategories } from '../globals/SearchCategories';
import { filterLocationsQuery } from '../data/filterLocationsQuery';
import { filterEpisodesQuery } from '../data/filterEpisodesQuery';

export default function SearchForm() {
	const [currentPage, setCurrentPage] = useState(1);
	const [currentSearchCategory, setCurrentSearchCategory] = useState(
		SearchCategories.Characters
	);
	const [currentSearchCommand, setcurrentSearchCommand] = useState(null);
	const [search, setSearch] = useState('');

	const [
		getCharacters,
		{ data: filteredCharacters, refetch: refetchCharacters },
	] = useLazyQuery(filterCharactersQuery, {
		variables: { page: currentPage, name: search },
	});

	const [getLocations, { data: filteredLocations, refetch: refetchLocations }] =
		useLazyQuery(filterLocationsQuery, {
			variables: { page: currentPage, name: search },
		});

	const [getEpisodes, { data: filteredEpisodes, refetch: refetchEpisodes }] =
		useLazyQuery(filterEpisodesQuery, {
			variables: { page: currentPage, name: search },
		});

	// Hooks müssen vor conditionals verwendet werden
	useSearchStore((state) =>
		state.dispatch({
			type: SearchCommands.FilterCharacters,
			data: { ...filteredCharacters, search, page: currentPage },
		})
	);

	const searchDispatch = useSearchStore((state) => state.dispatch);

	useEffect(() => {
		if (currentSearchCommand === SearchCommands.GetAll) {
			setSearch('');
		}
		switch (currentSearchCommand) {
			case SearchCommands.FilterCharacters:
				console.log(search, currentPage, currentSearchCategory);
				refetchCharacters({ page: currentPage, name: search });
				break;
			case SearchCommands.FilterLocations:
				refetchLocations({ page: currentPage, name: search });
				break;
			case SearchCommands.FilterEpisodes:
				refetchEpisodes({ page: currentPage, name: search });
				break;
			default:
				console.log(
					'no command',
					search,
					currentSearchCategory,
					currentPage,
					currentSearchCommand
				);
				break;
		}
	}, [search, currentSearchCategory, currentPage, currentSearchCommand]);

	return (
		<SearchField role="search" className="search-form">
			<RadioGroup
				className="search-categories"
				defaultValue={'characters'}
				onChange={(value) => {
					searchDispatch({
						type: SearchCommands.SetCategory,
						data: value,
					});
					setCurrentSearchCategory(value);
				}}
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
					onPress={() => {
						switch (currentSearchCategory) {
							case SearchCategories.Characters:
								(async function () {
									const res = await getCharacters({ page: currentPage });
									// setcurrentSearchCommand(SearchCommands.FilterCharacters);
									searchDispatch({
										type: SearchCommands.SetCharacters,
										data: res.data.characters.results,
									});
								})();
								break;
							case SearchCategories.Locations:
								(async function () {
									const res = await getLocations({ page: currentPage });
									// setcurrentSearchCommand(SearchCommands.FilterLocations);
									searchDispatch({
										type: SearchCommands.SetLocations,
										data: res.data.locations.results,
									});
								})();
								break;
							case SearchCategories.Episodes:
								(async function () {
									const res = await getEpisodes({ page: currentPage });
									// setcurrentSearchCommand(SearchCommands.FilterEpisodes);
									searchDispatch({
										type: SearchCommands.SetEpisodes,
										data: res.data.episodes.results,
									});
								})();
								break;
							default:
								break;
						}
					}}
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
					onPress={() => {
						switch (currentSearchCategory) {
							case SearchCategories.Characters:
								setcurrentSearchCommand(SearchCommands.FilterCharacters);
								setSearch(document.querySelector('.search-input').value);
								break;
							case SearchCategories.Locations:
								setcurrentSearchCommand(SearchCommands.FilterLocations);
								setSearch(document.querySelector('.search-input').value);
								break;
							case SearchCategories.Episodes:
								setcurrentSearchCommand(SearchCommands.FilterEpisodes);
								setSearch(document.querySelector('.search-input').value);
								break;
							default:
								console.log(currentSearchCategory);
								break;
						}
					}}
				>
					Search
				</Button>
			</section>
		</SearchField>
	);
}
