import Feed from "@/src/components/Feed";
import LeftMenu from "@/src/components/LeftMenu";
import RightMenu from "@/src/components/RightMenu";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-60 w-full">
              <Image
                src="https://images.pexels.com/photos/32637548/pexels-photo-32637548.jpeg"
                alt=""
                fill
                className="rounded-md object-cover"
              />
              <Image
                src="https://images.pexels.com/photos/24902523/pexels-photo-24902523.jpeg"
                alt=""
                width={128}
                height={128}
                className="rounded-full object-cover w-32 h-32 absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white z-10 "
              />
            </div>
            <span className="text-2xl font-semibold mt-16 mb-2">Jhon Carter</span>
            <div className="flex gap-10 items-center justify-center">
              <div className="flex flex-col items-center font-medium text-gray-600">
                <span>142</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col gap-1  items-center font-medium text-gray-600">
                <span>1.2K</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col gap-1  items-center font-medium text-gray-600">
                <span>1.4K</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden xl:block w-[30%]">
        <RightMenu userId="test" />
      </div>
    </div>
  );
};

export default ProfilePage;
