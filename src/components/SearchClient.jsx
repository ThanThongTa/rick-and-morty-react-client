import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Heading } from 'react-aria-components';

import SearchResult from './SearchResult';
import SearchInput from './SearchInput';
import SearchCategories from './SearchCategories';

/* Die oberste Komponente unserer App */
export default function SearchClient() {
	const client = new ApolloClient({
		uri: 'https://rickandmortyapi.com/graphql/',
		cache: new InMemoryCache(),
	});

	return (
		<section className="search-client">
			<Heading level="1" className="heading">
				Rick and Morty DB
			</Heading>
			<ApolloProvider client={client}>
				<SearchCategories />
				<SearchInput />
				<SearchResult />
			</ApolloProvider>
		</section>
	);
}
