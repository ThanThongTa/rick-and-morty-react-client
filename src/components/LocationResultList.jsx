import { Heading, ListBox, ListBoxItem } from 'react-aria-components';
import { useSearchStore } from '../hooks/useSearchStore';

export default function LocationResultList() {
	const locations = useSearchStore((state) => state.locations);
	const setSelected = useSearchStore(
		(state) => state.setCurrentlySelectedLocation
	);
	const changeSelected = (event) => {
		setSelected(event.currentKey);
	};

	//Infinite scrolling carousel for locations
	return (
		<>
			{locations && locations.length > 0 && (
				<section className="location-list location-list__section">
					<Heading level="4" className="location-list__heading">
						Location List{' '}
					</Heading>
					{!locations && 'No locations found'}
					{locations && (
						<>
							<ListBox
								aria-label="Locations List"
								selectionMode="single"
								onSelectionChange={changeSelected}
							>
								{locations.map((location) => (
									<ListBoxItem
										key={location.id}
										textValue={location.name}
										id={location.id}
									>
										{location.name}
									</ListBoxItem>
								))}
							</ListBox>
						</>
					)}
				</section>
			)}
		</>
	);
}
