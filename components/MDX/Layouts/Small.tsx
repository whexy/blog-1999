interface SmallProps {
  children?: React.ReactNode;
}

const Small = ({ children }: SmallProps) => {
  return (
    <span className="text-xs opacity-80 md:text-sm">{children}</span>
  );
};

export default Small;
