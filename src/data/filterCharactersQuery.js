import { gql } from '@apollo/client';

/* GraphQL Abfrage für die Charaktere mit Filtern */
export const filterCharactersQuery = gql`
	query (
		$page: Int
		$name: String
		$status: String
		$species: String
		$type: String
		$gender: String
	) {
		characters(
			page: $page
			filter: {
				name: $name
				status: $status
				species: $species
				type: $type
				gender: $gender
			}
		) {
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
