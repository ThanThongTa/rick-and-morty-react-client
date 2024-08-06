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
import { useSearchStore } from '../hooks/useSearchStore';

export default function CharacterResultFilters() {
	const characters = useSearchStore((state) => state.characters);
	const species = new Set(characters.map((character) => character.species));
	const types = new Set(characters.map((character) => character.type));

	const selectedGender = useSearchStore(
		(state) => state.currentlySelectedGender
	);
	const selectedStatus = useSearchStore(
		(state) => state.currentlySelectedStatus
	);
	const selectedType = useSearchStore(
		(state) => state.currentlySelectedCharacterType
	);
	const selectedSpecies = useSearchStore(
		(state) => state.currentlySelectedSpecies
	);
	const setSelectedGender = useSearchStore(
		(state) => state.setCurrentlySelectedGender
	);
	const setSelectedStatus = useSearchStore(
		(state) => state.setCurrentlySelectedStatus
	);
	const setSelectedSpecies = useSearchStore(
		(state) => state.setCurrentlySelectedSpecies
	);
	const setSelectedType = useSearchStore(
		(state) => state.setCurrentlySelectedCharacterType
	);

	const changeSelectedGender = (newSelectedGender) => {
		setSelectedGender(newSelectedGender);
	};

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
				onSelectionChange={changeSelectedGender}
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
