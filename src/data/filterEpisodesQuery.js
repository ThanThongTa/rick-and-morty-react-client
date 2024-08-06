import { gql } from '@apollo/client';

/* GraphQL Abfrage für die Episode mit Filtern */
export const filterEpisodesQuery = gql`
	query ($page: Int, $name: String) {
		episodes(page: $page, filter: { name: $name }) {
			info {
				count
				pages
			}
			results {
				id
				name
				air_date
				episode
				characters {
					id
					name
					status
					species
					type
					gender
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
					image
				}
			}
		}
	}
`;
