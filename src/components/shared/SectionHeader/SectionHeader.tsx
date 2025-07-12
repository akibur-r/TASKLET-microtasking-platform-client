interface SectionHeaderProps {
  name: string;
  tagline?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  name,
  tagline = "",
}) => {
  return (
    <header>
      <h2 className="font-fancy text-2xl md:text-3xl font-semibold">{name}</h2>
      {tagline && (
        <p className="text-sm md:text-base font-light opacity-80">{tagline}</p>
      )}
    </header>
  );
};

export default SectionHeader;
