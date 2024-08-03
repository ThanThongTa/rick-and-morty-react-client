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

			<SearchField className="search-form">
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
					<motion.button className="search button--ghost">Search</motion.button>
					<motion.button className="show-all button--ghost">
						Show all
					</motion.button>
				</section>
			</SearchField>
			<section className="search-results">
				<section className="search-results__list"></section>
				<section className="search-results__images"></section>
				<section className="search-results__details"></section>
			</section>
		</ApolloProvider>
	</React.StrictMode>
);
