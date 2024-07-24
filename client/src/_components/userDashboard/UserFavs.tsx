import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Link from 'next/link';
import linkIcon from '../../assets/link-svgrepo-com.svg';
import binIcon from '../../assets/trash-can.svg';
import Image from 'next/image';

function UserFavs() {
  const { user } = useContext(AuthContext);

  // Renderable elements
  const noFavs = <p>You didn't save any locations yet...</p>;
  return (
    <>
      <div className="mx-auto w-11/12 rounded-sm bg-slate-200 px-4 py-2">
        {user!.favs && (
          <h4 className="text-center font-bold">
            Currently you have{' '}
            <span className="text-red-500">{user!.favs.length}</span> favs
            saved:
          </h4>
        )}
        <ol className="list-inside list-decimal">
          {user!.favs
            ? user?.favs.map((fav) => {
                return (
                  <li className="my-2 flex justify-between border-b-2 border-stone-400 py-2">
                    <p>
                      <span className="font-bold">Title : </span>
                      {fav.title}
                    </p>
                    <div className="mr-2 flex gap-x-3">
                      <Link href={`/locations/${fav._id}`}>
                        <Image src={linkIcon} alt="link" className="w-5" />
                      </Link>
                      <Image src={binIcon} alt="link" className="w-5" />
                    </div>
                  </li>
                );
              })
            : noFavs}
        </ol>
      </div>
    </>
  );
}

export default UserFavs;
