import { FetchError } from '../types/GeneralTypes';

type Props = {
  error: FetchError;
};

export const FetchErrorSection = ({ error }: Props) => {
  return (
    <div className="mt-10">
      <h1 className="text-center text-lg font-bold">{error.message}</h1>
      <p className="text-center text-red-500">{error.info}</p>
    </div>
  );
};
