import { gql } from '@apollo/client';

export const filterCharactersQuery = gql`
	query ($page: Int, $name: String) {
		characters(page: $page, filter: { name: $name }) {
			info {
				count
				pages
			}
			results {
				id
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
	}
`;
