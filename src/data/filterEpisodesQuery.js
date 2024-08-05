import { gql } from '@apollo/client';

export const filterEpisodesQuery = gql`
	query ($page: Int, $name: String) {
		episodes(page: $page, filter: { name: $name }) {
			info {
				count
				pages
			}
			results {
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
