import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Heading } from 'react-aria-components';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

export default function SearchClient() {
	const client = new ApolloClient({
		uri: 'https://rickandmortyapi.com/graphql/',
		cache: new InMemoryCache(),
	});

	return (
		<>
			<Heading level="1" className="heading">
				Rick and Morty DB
			</Heading>
			<ApolloProvider client={client}>
				<SearchForm />
				<SearchResult />
			</ApolloProvider>
		</>
	);
}
