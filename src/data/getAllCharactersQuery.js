import { gql } from '@apollo/client';

export const allCharactersQuery = gql`
	query {
		characters(page: 1, filter: { name: "rick" }) {
			info {
				count
				pages
			}
			results {
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
		location(id: 1) {
			id
		}
		episodesByIds(ids: [1, 2]) {
			id
		}
	}
`;
