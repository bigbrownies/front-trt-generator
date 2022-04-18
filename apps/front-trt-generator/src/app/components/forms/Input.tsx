import classNames from 'classnames';
import React from 'react';
import { FormsState } from './_constants';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  state?: FormsState;
  className?: string;
};

function Input({ state = FormsState.none, className, ...otherProps }: Props) {
  const classes = classNames(
    'outline-none bg-gray-200 p-2',
    'border-0 border-b-2 border-gray-500',
    className,
    {
      'text-danger border-danger-500': state === FormsState.error,
      'text-warning border-warning-500': state === FormsState.warning,
    }
  );

  return <input {...otherProps} className={classes} />;
}
export default Input;
