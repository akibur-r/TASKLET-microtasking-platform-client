interface SectionHeaderProps {
  name: string;
  tagline?: string;
  className?: string;
  headingClassName?: string;
  taglineClassName?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  name,
  tagline = "",
  className = "",
  headingClassName = "",
  taglineClassName = "",
}) => {
  return (
    <header className={className}>
      <h2
        className={
          `font-fancy text-2xl md:text-3xl font-medium` +
          " " +
          headingClassName
        }
      >
        {name}
      </h2>
      {tagline && (
        <p
          className={`text-sm md:text-base font-light opacity-80 ${taglineClassName}`}
        >
          {tagline}
        </p>
      )}
    </header>
  );
};

export default SectionHeader;
