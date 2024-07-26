import React from 'react';

type Props = {
  favsCount: number;
};

function FavHeader({ favsCount }: Props) {
  return (
    <h4 className="text-center font-bold">
      You have <span className="text-red-500">{favsCount}</span> location in
      favourites:
    </h4>
  );
}

export default FavHeader;
