import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

const ToolCard = ({ title, description, icon: Icon, path, color }: ToolCardProps) => {
  return (
    <Link to={path} className="tool-card group">
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>
      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </Link>
  );
};

export default ToolCard;
