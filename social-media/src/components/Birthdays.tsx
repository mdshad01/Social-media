import Image from "next/image";
import Link from "next/link";
import React from "react";

const Birthdays = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">Birthday</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <Image
            src="https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg"
            alt=""
            height={40}
            width={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">Kate Winslet</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-blue-500 text-white py-1 px-2 rounded-lg text-xs">Celebrate</button>
        </div>
      </div>
      {/* UPCOMMING */}
      <div className="p-4 bg-slate-100 rounded-lg flex item-center gap-4 mt-4">
        <Image src="/gift.png" alt="" height={24} width={24} className="w-6 h-6 " />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">Upcoming Birthdays</span>
          <span className="text-gray-500">See others 16 have upcoming birthdays</span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
