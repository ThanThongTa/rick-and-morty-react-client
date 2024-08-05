import { gql } from '@apollo/client';

export const allEpisodesQuery = gql`
	query ($page: Int) {
		episodes(page: $page) {
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
