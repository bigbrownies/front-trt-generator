import React from 'react';

type Props = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

function InputLabel(props: Props) {
  return (
    <label {...props} className="block text-gray-700 text-sm font-bold mb-2" />
  );
}

export default InputLabel;
