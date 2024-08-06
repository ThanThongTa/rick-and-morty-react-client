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

/* Komponente für die Einstellungen der Charaktersuche */
export default function CharacterResultFilters() {
	const characters = useCharactersStore((state) => state.characters);
	/* Ermitteln der Werte für die Species */
	const species = new Set(characters.map((character) => character.species));
	/* Ermitteln der Werte für den Type */
	const types = new Set(characters.map((character) => character.type));

	/* Ermitteln der ausgewählten Werte aus Zustand */
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
	/* Ermitteln der Set-Funktionen aus Zustand */
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
		<section className="character-filters-wrapper">
			<Heading level="4">Character Filters</Heading>
			{/* Select für die Species */}
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
			{/* Ende Select für die Species */}
			{/* Select für den Type */}
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
			{/* Ende Select für den Type */}
			{/* Select für den Status */}
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
			{/* Ende Select für den Status */}
			{/* Select für den Gender */}
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
			{/* Ende Select für den Gender */}
		</section>
	);
}
