interface ITooltipProps {
  name: string;
  arrow: string;
}

export const Tooltip = ({ name, arrow }: ITooltipProps) => {
  return (
    <>
      <div
        className={`tooltip ${arrow} absolute opacity-100 bg-zinc-300 text-slate-900 text-left text-xs rounded p-2 z-10 ml-[60px] -mt-16 pointer-events-none transition-transform duration-300 transform translate-y-2`}
      >
        {name}
      </div>
    </>
  );
};
