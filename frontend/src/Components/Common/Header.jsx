import { UserButton } from "@clerk/react";

function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold">
          DhanChakra
        </h2>
      </div>

      <UserButton />
    </header>
  );
}

export default Header;