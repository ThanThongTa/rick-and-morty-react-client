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

/* Komponente für die Anzeige der Filter für die Locations */
export default function LocationResultFilters() {
	/* Auslesen aktueller Werte aus Zustand */
	const locations = useLocationsStore((state) => state.locations);
	const selectedType = useLocationsStore(
		(state) => state.currentlySelectedType
	);
	const selectedDimension = useLocationsStore(
		(state) => state.currentlySelectedDimension
	);
	/* Ermitteln der Set-Funktionen aus Zustand */
	const setSelectedType = useLocationsStore(
		(state) => state.setCurrentlySelectedType
	);
	const setSelectedDimension = useLocationsStore(
		(state) => state.setCurrentlySelectedDimension
	);

	/* Ermitteln der Types aus den Locations */
	const types = new Set(locations.map((location) => location.type));

	/* Ermitteln der Dimensions aus den Locations */
	const dimensions = new Set(locations.map((location) => location.dimension));

	return (
		<section className="location-filters-wrapper">
			<Heading level="4">Location Filters</Heading>
			{/* Select für die Types der Locations */}
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
			{/* Ende Select für die Types */}
			{/* Select für die Dimensions der Locations */}
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
			{/* Ende Select für die Dimensions */}
		</section>
	);
}
