import { gql } from '@apollo/client';

/* GraphQL Abfrage für die Episode ohne Filter */
export const allEpisodesQuery = gql`
	query ($page: Int) {
		episodes(page: $page) {
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
