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
import { useLocationsStore } from '../hooks/useLocationsStore';

export default function LocationResultFilters() {
	const locations = useLocationsStore((state) => state.locations);
	const types = new Set(locations.map((location) => location.type));
	const selectedType = useLocationsStore(
		(state) => state.currentlySelectedType
	);
	const setSelectedType = useLocationsStore(
		(state) => state.setCurrentlySelectedType
	);
	const dimensions = new Set(locations.map((location) => location.dimension));
	const selectedDimension = useLocationsStore(
		(state) => state.currentlySelectedDimension
	);
	const setSelectedDimension = useLocationsStore(
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
