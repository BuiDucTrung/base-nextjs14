import * as React from 'react';

export interface ITextErrorFormProps {
	text?: string;
}

export default function TextErrorForm({ text = '' }: ITextErrorFormProps) {
	return (
		<div className="min-h-[18px]">
			<span className="text-[#ff3b30] text-[13px] ">{text}</span>
		</div>
	);
}
