import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className=" flex items-center gap-1">
        <Image
          src="/icons/nexatalk.png"
          width={200}
          height={200}
          alt="Streamify"
          className="h-[50px] w-[200px] object-contain"
        />
        {/* <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Streamify
        </p> */}
      </Link>
      {/* User Dp (User Management) */}
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
