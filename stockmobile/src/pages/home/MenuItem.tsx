import { IonIcon } from "@ionic/react";
import React from "react";
import { Link } from "react-router-dom";

type MenuItemProps = {
  icon: string;
  title: string;
  path: string;
  color?: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, path, color }) => {
  return (
    <Link to={path} className="menu-item">
      <IonIcon color={color} icon={icon} className="menu-item-media" />
      <div className="menu-item-label">{title}</div>
    </Link>
  );
};

export default MenuItem;
