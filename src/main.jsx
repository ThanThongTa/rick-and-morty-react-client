import React from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from '@apollo/client';
import { Heading, Input, SearchField } from 'react-aria-components';

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
				Rick and Morty React Client
			</Heading>
			<nav aria-label="Navigation" className="navigation">
				<button aria-label="Characters" className="nav__button nav-chars">
					Characters
				</button>
				<button aria-label="Locations" className="nav__button nav-locs">
					Locations
				</button>
				<button aria-label="Episodes" className="nav__button nav-eps">
					Episodes
				</button>
			</nav>
			<SearchField aria-label="Search form" className="search-form">
				<Input
					aria-label="Search"
					className="search-input"
					placeholder="Search"
				/>
				<motion.button aria-label="Search button" className="search">
					Search
				</motion.button>
			</SearchField>
			<section className="search-results">
				<section className="search-results__list"></section>
				<section className="search-results__images"></section>
				<section className="search-results__details"></section>
			</section>
		</ApolloProvider>
	</React.StrictMode>
);
