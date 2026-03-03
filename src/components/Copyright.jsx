const Copyright = ({ name = "Wahed126", year = 2026, githubUrl = "https://github.com/Wahed126" }) => {
  return (
    <p className="text-center text-xs text-gray-400">
      All rights reserved{" "}
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-600 underline"
      >
        @{name}
      </a>{" "}
      &copy;{year}
    </p>
  );
};

export default Copyright;
