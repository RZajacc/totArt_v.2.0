'use client';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { getAllLocations } from '../../fetchers/GetAllLocations';

function Content() {
  const { data: locations } = useSWR(
    'http://localhost:5000/api/posts/all',
    getAllLocations,
  );

  /* {user ? <AddContentModal /> : ""} */

  return (
    <>
      <h1 className="text-center text-xl font-bold">
        Number of locations found:{' '}
        <span className="text-green-500">{locations?.number}</span>
      </h1>
      <div className="mx-auto mt-3 grid max-w-3xl gap-3 sm:grid-cols-2 md:grid-cols-3">
        {locations &&
          locations.posts.map((post) => {
            return (
              <div
                key={post._id}
                className="rounded-lg border-2 border-black shadow-md shadow-black"
              >
                <section>
                  {/* For now Im using some arbitrary values untill I update image info in DB */}
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={600}
                    layout="responsive"
                    className="rounded-lg"
                  />
                </section>
                <section className="mb-4 mt-1 text-center">
                  <h3 className="mb-3 text-xl font-bold">{post.title}</h3>
                  {/* Temporary location until connecting view is ready*/}
                  <Link
                    href={`/locations/${post._id}`}
                    className="rounded-md bg-black px-3 py-2 text-white"
                  >
                    See more
                  </Link>
                </section>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Content;
