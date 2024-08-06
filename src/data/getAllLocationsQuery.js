import { gql } from '@apollo/client';

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
