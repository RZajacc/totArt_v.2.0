import Link from "next/link";

function MyNav() {
  return (
    <div>
      <Link href={"/"}>Home</Link>
      <Link href={"content"}>Content</Link>
      <Link href={"contact"}>Contact</Link>
      <Link href={"account"}>Account</Link>
    </div>
  );
}

export default MyNav;
