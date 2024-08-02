import React from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'framer-motion';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from '@apollo/client';
import { Button } from 'react-aria-components';

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
			<h1>React-Projekt 👩🏻‍💻</h1>
			<motion.div animate={{ x: 100 }}>Test</motion.div>
			<Button>Aria Button</Button>
		</ApolloProvider>
	</React.StrictMode>
);
