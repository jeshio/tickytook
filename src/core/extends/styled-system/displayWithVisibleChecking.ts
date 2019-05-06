import { display, DisplayProps } from 'styled-system';
import { VisibleProps } from './interfaces';

export default function displayWithVisibleChecking({
  visible,
  ...props
}: VisibleProps & DisplayProps) {
  if (visible === false) {
    return 'display: none';
  }

  if (Array.isArray(visible)) {
    const _display = props.display;
    const newDisplayProp = visible.map((v, i) =>
      v
        ? Array.isArray(_display)
          ? _display[i] || _display[_display.length - 1]
          : _display
        : 'none'
    );
    return display({
      ...props,
      display: [
        ...newDisplayProp,
        ...(Array.isArray(_display) ? _display.slice(newDisplayProp.length) : []),
      ],
    });
  }

  return display(props);
}
