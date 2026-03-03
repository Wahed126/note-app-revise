import { motion } from "framer-motion";

const Header = ({ title, className = "" }) => {
  return (
    <motion.header
      className={`w-full pb-4 border-b border-gray-200 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
        {title}
      </h1>
    </motion.header>
  );
};

export default Header;
