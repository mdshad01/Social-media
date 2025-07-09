import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserInfoCart = ({ userId }: { userId: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-2">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {/* BOTTOM */}
      <div className="flex gap-2 items-center mt-2">
        <span className="text-xl font-medium">Jhon Carter</span>
        <span className="text-gray-500 font-medium">@jhoncarter</span>
      </div>
      <p className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aliquid atque, dolore libero iusto placeat
        quisquam.😊
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <Image src="/map.png" alt="" width={16} height={16} className="w-4 h-4" />
          <span className="text-gray-500">
            Liveing in <b>Denver</b>
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <Image src="/school.png" alt="" width={16} height={16} className="w-4 h-4" />
          <span className="text-gray-500">
            Went to <b>Edgar High School</b>
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <Image src="/work.png" alt="" width={16} height={16} className="w-4 h-4" />
          <span className="text-gray-500">
            Work at <b>Apple inc</b>.
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <Image src="/link.png" alt="" width={16} height={16} className="w-4 h-4" />
            <span className="text-blue-500 font-medium cursor-pointer">shad.dev </span>
          </div>
          <div className="flex gap-1 items-center">
            <Image src="/date.png" alt="" width={16} height={16} className="w-4 h-4" />
            <span className="text-gray-500 font-medium">Joined November 2024 </span>
          </div>
        </div>
        <button className="bg-blue-500 text-white w-full p-2 font-medium rounded-md cursor-pointer">Following</button>
        <button className="text-red-400 text-xs self-end font-medium cursor-pointer">Block User</button>
      </div>
    </div>
  );
};

export default UserInfoCart;
