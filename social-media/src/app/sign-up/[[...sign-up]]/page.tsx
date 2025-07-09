import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-[calc(120vh-96px)] w-full items-center justify-center text-sm">
      <SignUp />
    </div>
  );
}
