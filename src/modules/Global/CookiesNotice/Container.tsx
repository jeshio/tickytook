import * as React from 'react';
import StorageService from 'src/core/services/StorageService';
import Presentation from './Presentation';

export interface IContainerProps {}

export interface IContainerState {
  visible: boolean;
}

const STORAGE_PROP_PATH = 'notices.cookies';

export default class Container extends React.Component<IContainerProps, IContainerState> {
  constructor(props: IContainerProps) {
    super(props);

    this.state = {
      visible: !StorageService.getIn(STORAGE_PROP_PATH),
    };
  }

  public componentDidMount() {
    // в следующий раз модалка уже не отобразится
    StorageService.setIn(STORAGE_PROP_PATH, true);
  }

  public handleClickClose = () => {
    this.setState({ visible: false });
  };

  public render() {
    if (!this.state.visible) {
      return null;
    }

    return <Presentation onClickClose={this.handleClickClose} />;
  }
}
