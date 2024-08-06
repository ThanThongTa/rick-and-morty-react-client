import { gql } from '@apollo/client';

/* GraphQL Abfrage für die Location ohne Filter */
export const allLocationsQuery = gql`
	query ($page: Int) {
		locations(page: $page) {
			info {
				count
				pages
			}
			results {
				id
				name
				type
				dimension
				residents {
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
					image
					episode {
						name
						episode
					}
				}
			}
		}
	}
`;
