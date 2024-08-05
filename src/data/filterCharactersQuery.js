import { gql } from '@apollo/client';

export const filterCharactersQuery = gql`
	query getFilteredCharacters($page: Int, $name: String) {
		characters(page: $page, filter: { name: $name }) {
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
