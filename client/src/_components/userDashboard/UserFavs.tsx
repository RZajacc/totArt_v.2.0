import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import FavItem from './FavItem';

function UserFavs() {
  const { user } = useContext(AuthContext);

  // Renderable elements
  const noFavs = (
    <p className="text-center">You didn't save any locations yet...</p>
  );

  const header = (
    <h4 className="text-center font-bold">
      You have <span className="text-red-500">{user?.favs.length}</span>{' '}
      location in favourites:
    </h4>
  );

  return (
    <>
      <div className="mx-auto w-11/12 rounded-sm bg-slate-200 px-4 py-2">
        {user!.favs.length > 0 ? header : noFavs}
        <ol className="list-inside list-decimal">
          {user!.favs &&
            user?.favs.map((fav) => {
              return (
                <FavItem
                  key={fav._id}
                  id={fav._id}
                  title={fav.title}
                  userEmail={user.email}
                />
              );
            })}
        </ol>
      </div>
    </>
  );
}

export default UserFavs;
