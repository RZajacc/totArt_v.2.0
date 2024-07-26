import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import FavItem from './FavItem';
import FavHeader from './FavHeader';

function UserFavs() {
  const { user } = useContext(AuthContext);

  // Renderable elements
  const noFavs = (
    <p className="text-center">You didn't save any locations yet...</p>
  );

  return (
    <>
      <div className="mx-auto w-11/12 rounded-sm bg-slate-200 px-4 py-2">
        {user!.favs.length > 0 ? (
          <FavHeader favsCount={user!.favs.length} />
        ) : (
          noFavs
        )}
        <ol className="list-inside list-decimal">
          {user!.favs &&
            user?.favs.map((fav) => {
              return (
                <FavItem
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
