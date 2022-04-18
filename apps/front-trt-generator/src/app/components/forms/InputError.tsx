import classNames from 'classnames';
import { FormsState } from './_constants';

type Props = {
  message: string;
  state: FormsState;
  className: string;
};

const InputError = ({ message, state, className }: Props) => {
  const classes = classNames('', className, {
    'text-danger': state === FormsState.error,
    'text-warning': state === FormsState.warning,
  });

  return <p className={classes}>{message}</p>;
};

export default InputError;
