import { Label, Radio, RadioGroup } from 'react-aria-components';

export default function ImageRadioGroup({
	defaultValue,
	onChange,
	list,
	sectionName,
}) {
	const lcSectionName = sectionName.toLowerCase();
	return (
		<RadioGroup
			className={`list--${lcSectionName}__radio-group radio-group`}
			defaultValue={defaultValue}
			onChange={onChange}
		>
			<section
				className={`list--${lcSectionName}__label-section label-section`}
			>
				<Label className={`list--${lcSectionName}__label radio-group-label`}>
					{sectionName}
				</Label>
			</section>
			<section
				className={`list--${lcSectionName}__radio-section image-radio-section`}
			>
				{list.map(
					(item) =>
						item && (
							<Radio
								key={item.id}
								value={item.id}
								className={`list--${lcSectionName}__radio image-radio`}
							>
								<img
									className="image-radio__image"
									src={item.image}
									alt={item.name}
								/>
								{item.name}
							</Radio>
						)
				)}
			</section>
		</RadioGroup>
	);
}
