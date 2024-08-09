import { Label, Radio, RadioGroup } from 'react-aria-components';

export default function SearchRadioGroup({
	defaultValue,
	onChange,
	list,
	sectionName,
}) {
	const lcSectionName = sectionName.toLowerCase();
	return (
		<RadioGroup
			className={`filters--${lcSectionName}__radio-group radio-group`}
			defaultValue={defaultValue}
			onChange={onChange}
		>
			<section
				className={`filters--${lcSectionName}__label-section label-section`}
			>
				<Label className={`filters--${lcSectionName}__label radio-group-label`}>
					{sectionName}
				</Label>
				<Radio
					value="all"
					className={`filters--${lcSectionName}__radio search-radio radio-all`}
				>
					all
				</Radio>
			</section>
			<section
				className={`filters--${lcSectionName}__radio-section radio-section`}
			>
				{list.map(
					(item) =>
						item && (
							<Radio
								key={item}
								value={item}
								className={`filters--${lcSectionName}__radio search-radio`}
							>
								{item}
							</Radio>
						)
				)}
			</section>
		</RadioGroup>
	);
}
