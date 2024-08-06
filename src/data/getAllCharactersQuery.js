import { gql } from '@apollo/client';

/* GraphQL Abfrage für die Charaktere ohne Filter */
export const allCharactersQuery = gql`
	query ($page: Int) {
		characters(page: $page) {
			info {
				count
				pages
			}
			results {
				id
				name
				status
				species
				type
				gender
				image
				origin {
					name
					type
					dimension
				}
				location {
					name
					type
					dimension
				}
				episode {
					name
					episode
				}
			}
		}
	}
`;
