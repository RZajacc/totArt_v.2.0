// Libraries
import Link from 'next/link';
// Types
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to totArt, a place where you can share inteteresting locations around your city',
};

function Home() {
  return (
    <div className="mx-auto mt-3 max-w-xl md:mt-6 ">
      <h1 className="text-center text-2xl font-bold">
        Welcome to Totart page!
      </h1>
      <section className="mt-3">
        <p>
          So to begin with, where does this name comes from? Well It comes from
          a name of a simple psychological phenomenon when you try to recall
          something and you feel like you almost have it but not really. It is
          called a tip of the tongue phenomenon.
        </p>
        <br />
        <p>
          It applies for words and informations, but here I will use it in a
          different context. How many times have you walked around the city,
          seen a cool place and thought "cool, I should definitely remember this
          place", and a minute after you forget that it ever existed?
        </p>
        <br />
        <p>
          If this feeling is familiar to you&apos;ve came to the right place.
          You can document those places here or just watch, what other people
          shared! Hope you&apos;ll enjoy it! To start browsing the content just
          click{' '}
          <Link href={'/locations'} className="font-bold hover:animate-pulse">
            here!
          </Link>
          😊
        </p>
      </section>
    </div>
  );
}

export default Home;
