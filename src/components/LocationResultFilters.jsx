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

export default function LocationResultFilters() {
	const locations = useSearchStore((state) => state.locations);
	const types = new Set(locations.map((location) => location.type));
	const selectedType = useSearchStore(
		(state) => state.currentlySelectedLocationType
	);
	const setSelectedType = useSearchStore(
		(state) => state.setCurrentlySelectedLocationType
	);
	const dimensions = new Set(locations.map((location) => location.dimension));
	const selectedDimension = useSearchStore(
		(state) => state.currentlySelectedDimension
	);
	const setSelectedDimension = useSearchStore(
		(state) => state.setCurrentlySelectedDimension
	);

	return (
		<div>
			<Heading level="4">Location Filters</Heading>
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
				onSelectionChange={setSelectedDimension}
				selectedKey={selectedDimension}
			>
				<Label>Dimension</Label>
				<Button>
					<SelectValue />
					<span aria-hidden="true">▼</span>
				</Button>
				<Popover>
					<ListBox>
						<ListBoxItem id="all" textValue="all">
							all
						</ListBoxItem>
						{Array.from(dimensions).map(
							(dimension) =>
								dimension && (
									<ListBoxItem key={dimension} id={dimension}>
										{dimension}
									</ListBoxItem>
								)
						)}
					</ListBox>
				</Popover>
			</Select>
		</div>
	);
}
