import React from "react";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import { Span } from "next/dist/trace";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={50} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
            {session && session?.user ? (
                <>
                    <Link href="/startup/create">
                        <span>Create</span>
                    </Link>
                    <form action={async () => {
                        "use server";

                        await signOut( {redirectTo: "/"})
                    }}>
                        <button type="submit">Logout</button>
                    </form>
                    <Link href={`/user/${session?.expires}`}>
                        <span>{session?.user?.name}</span>
                    </Link>
                </>
            ) : (
                <form action={async () => {
                    "use server";
                    await signIn('github')}}>
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
