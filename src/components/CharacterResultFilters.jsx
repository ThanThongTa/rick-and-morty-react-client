import {
	Button,
	Heading,
	Label,
	ListBox,
	ListBoxItem,
	Popover,
	Select,
	SelectValue,
} from 'react-aria-components';
import { useCharactersStore } from '../hooks/useCharactersStore';

export default function CharacterResultFilters() {
	const characters = useCharactersStore((state) => state.characters);
	const species = new Set(characters.map((character) => character.species));
	const types = new Set(characters.map((character) => character.type));

	const selectedGender = useCharactersStore(
		(state) => state.currentlySelectedGender
	);
	const selectedStatus = useCharactersStore(
		(state) => state.currentlySelectedStatus
	);
	const selectedType = useCharactersStore(
		(state) => state.currentlySelectedType
	);
	const selectedSpecies = useCharactersStore(
		(state) => state.currentlySelectedSpecies
	);
	const setSelectedGender = useCharactersStore(
		(state) => state.setCurrentlySelectedGender
	);
	const setSelectedStatus = useCharactersStore(
		(state) => state.setCurrentlySelectedStatus
	);
	const setSelectedSpecies = useCharactersStore(
		(state) => state.setCurrentlySelectedSpecies
	);
	const setSelectedType = useCharactersStore(
		(state) => state.setCurrentlySelectedType
	);

	return (
		<div>
			<Heading level="4">Character Filters</Heading>
			<Select
				onSelectionChange={setSelectedSpecies}
				selectedKey={selectedSpecies}
			>
				<Label>Species</Label>
				<Button>
					<SelectValue />
					<span aria-hidden="true">▼</span>
				</Button>
				<Popover>
					<ListBox>
						<ListBoxItem id="all" textValue="all">
							all
						</ListBoxItem>
						{Array.from(species).map(
							(species) =>
								species && (
									<ListBoxItem key={species} id={species}>
										{species}
									</ListBoxItem>
								)
						)}
					</ListBox>
				</Popover>
			</Select>
			<Select onSelectionChange={setSelectedType} selectedKey={selectedType}>
				<Label>Type</Label>
				<Button>
					<SelectValue />
					<span aria-hidden="true">▼</span>
				</Button>
				<Popover>
					<ListBox>
						<ListBoxItem id="all" textValue="all">
							all
						</ListBoxItem>
						{Array.from(types).map(
							(type) =>
								type && (
									<ListBoxItem key={type} id={type}>
										{type}
									</ListBoxItem>
								)
						)}
					</ListBox>
				</Popover>
			</Select>
			<Select
				onSelectionChange={setSelectedStatus}
				selectedKey={selectedStatus}
			>
				<Label>Status</Label>
				<Button>
					<SelectValue />
					<span aria-hidden="true">▼</span>
				</Button>
				<Popover>
					<ListBox>
						<ListBoxItem id="all">all</ListBoxItem>
						<ListBoxItem id="alive">alive</ListBoxItem>
						<ListBoxItem id="dead">dead</ListBoxItem>
						<ListBoxItem id="unknown">unknown</ListBoxItem>
					</ListBox>
				</Popover>
			</Select>
			<Select
				onSelectionChange={setSelectedGender}
				selectedKey={selectedGender}
			>
				<Label>Gender</Label>
				<Button>
					<SelectValue />
					<span aria-hidden="true">▼</span>
				</Button>
				<Popover>
					<ListBox>
						<ListBoxItem id="all">all</ListBoxItem>
						<ListBoxItem id="female">female</ListBoxItem>
						<ListBoxItem id="male">male</ListBoxItem>
						<ListBoxItem id="genderless">genderless</ListBoxItem>
						<ListBoxItem id="unknown">unknown</ListBoxItem>
					</ListBox>
				</Popover>
			</Select>
		</div>
	);
}
