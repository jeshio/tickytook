declare module 'modules/Globals/Sidebar' {
  interface MenuItem {
    title: string;
    link?: string;
    onClick?: () => void;
    svg?: React.ComponentType<any>;
  }
}
