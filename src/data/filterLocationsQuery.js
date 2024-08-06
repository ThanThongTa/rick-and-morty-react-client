import { gql } from '@apollo/client';

/* GraphQL Abfrage für die Location mit Filtern */
export const filterLocationsQuery = gql`
	query ($page: Int, $name: String, $type: String, $dimension: String) {
		locations(
			page: $page
			filter: { name: $name, type: $type, dimension: $dimension }
		) {
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
