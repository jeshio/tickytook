import React, { Component } from 'react';

export interface IPresentationProps {}

export default class Presentation extends Component<IPresentationProps, any> {
  public render() {
    return <div>ok {this.props.children}</div>;
  }
}
