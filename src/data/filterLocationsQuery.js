import { gql } from '@apollo/client';

export const filterLocationsQuery = gql`
	query ($page: Int, $name: String) {
		locations(page: $page, filter: { name: $name }) {
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
