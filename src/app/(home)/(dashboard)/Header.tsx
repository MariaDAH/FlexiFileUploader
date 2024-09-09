import ThemeToggle from "./theme-toggle";

export const Header = () => {
  return (
    <>
      <header className="w-screen h-auto fixed flex justify-end">
        <div className="py-6 pr-8">
          <ThemeToggle />
        </div>
      </header>
    </>
  );
};
