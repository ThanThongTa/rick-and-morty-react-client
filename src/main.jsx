import React from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from '@apollo/client';
import {
	Button,
	Heading,
	Input,
	Label,
	Radio,
	RadioGroup,
	SearchField,
} from 'react-aria-components';

const client = new ApolloClient({
	uri: 'https://rickandmortyapi.com/graphql/',
	cache: new InMemoryCache(),
});

client
	.query({
		query: gql`
			query {
				characters(page: 2, filter: { name: "rick" }) {
					info {
						count
					}
					results {
						name
					}
				}
				location(id: 1) {
					id
				}
				episodesByIds(ids: [1, 2]) {
					id
				}
			}
		`,
	})
	.then((result) => console.log(result));

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Heading level="1" className="heading">
				Rick and Morty DB
			</Heading>

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
					<Label className="visually-hidden">Search</Label>
					<Input className="search-input" placeholder="Search" />
					<motion.div className="visually-hidden"></motion.div>
					<Button
						type="button"
						aria-label="Search"
						className="search-button button--ghost"
						excludeFromTabOrder={false}
					>
						Search
					</Button>
					<Button
						aria-label="Show all"
						className="show-all-button button--ghost"
						excludeFromTabOrder={false}
					>
						Show all
					</Button>
				</section>
			</SearchField>
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
					Listbox of images to the characters search results
					<br />
					Zusätzliche Design Patterns: <br />
					Command, Strategy, Visitor
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
		</ApolloProvider>
	</React.StrictMode>
);
