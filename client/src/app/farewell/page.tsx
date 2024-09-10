// Libraries
import Image from 'next/image';
import Link from 'next/link';
// Assets
import cryingFace from '@/assets/crying.png';

function Farewell() {
  return (
    <div className="mx-auto mt-8 w-10/12 space-y-2 text-center">
      <p className="font-bold">
        I'm sorry to see you leaving.. Hope to see you again!
      </p>
      <Image src={cryingFace} alt="crying-emoji" />
      <p>
        If you want to move to the main page click{' '}
        <Link href={'/'} className="font-bold hover:font-extrabold">
          here
        </Link>
        !
      </p>
    </div>
  );
}

export default Farewell;
