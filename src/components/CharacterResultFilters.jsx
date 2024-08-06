import {
	Button,
	Heading,
	Label,
	ListBox,
	ListBoxItem,
	Popover,
	Select,
	SelectValue,
	Tag,
	TagGroup,
	TagList,
} from 'react-aria-components';
import { useSearchStore } from '../hooks/useSearchStore';
import { useState } from 'react';

export default function CharacterResultFilters() {
	const characters = useSearchStore((state) => state.characters);
	const species = new Set(characters.map((character) => character.species));
	const types = new Set(characters.map((character) => character.type));

	const [selectedGender, setSelectedGender] = useState('all');
	const [selectedStatus, setSelectedStatus] = useState('all');
	const [selectedSpecies, setSelectedSpecies] = useState('');
	const [selectedType, setSelectedType] = useState('all');

	return (
		<div>
			<Heading level="4">Character Filters</Heading>
			<TagGroup
				aria-label="Character species"
				selectionMode="single"
				selectedKeys={[selectedSpecies]}
				onSelectionChange={setSelectedSpecies}
			>
				<Label>Species</Label>
				<TagList>
					{Array.from(species).map((species) => (
						<Tag key={species} id={species}>
							{species}
						</Tag>
					))}
				</TagList>
			</TagGroup>
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
