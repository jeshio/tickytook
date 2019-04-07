import { Component, createElement } from 'react';
import Presentation, { IPresentationProps } from './Presentation';

export default class Container extends Component {
  public render() {
    return createElement<IPresentationProps>(Presentation, {});
  }
}
