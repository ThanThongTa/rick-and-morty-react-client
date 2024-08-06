import { Heading } from 'react-aria-components';

export default function CharacterResultFilters() {
	return (
		<div>
			<Heading level="4">Character Filters</Heading>
			Characters: species als TagGroup, type als ListBox
			<br />
			status als Select: all, alive, dead, unknown
			<br />
			gender als Select: all, female, male, genderless, unknown
		</div>
	);
}
