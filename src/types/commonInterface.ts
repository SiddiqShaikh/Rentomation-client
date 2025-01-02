import { IconType } from "react-icons";
export interface HomeInterfaceProps {}
export interface NotFoundInterfaceProps {}
export interface NavbarProps {}
export interface ButtonProps {
  className?: string;
  label?: string;
  onClick?: any;
  loading?: Boolean;
  variant?:'Primary' | 'Secondary'
  icon?:IconType;
  disabled?:boolean
}
