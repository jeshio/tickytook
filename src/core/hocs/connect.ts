import {
  connect as reduxConnect,
  MapDispatchToPropsNonObject,
  MapStateToPropsParam,
} from 'react-redux';

const connect = <TSelectors = {}, TActions = {}, TOwnProps = {}, TState = {}>(
  mapStateToProps: MapStateToPropsParam<TSelectors, TOwnProps, TState> = () => ({} as TSelectors),
  mapDispatchToProps: MapDispatchToPropsNonObject<TActions, TOwnProps> = () => ({} as TActions)
) => {
  return reduxConnect<{ selectors: TSelectors }, { actions: TActions }, TOwnProps, TState>(
    (state, ownProps) => ({
      selectors: (mapStateToProps ? mapStateToProps(state as TState, ownProps) : {}) as TSelectors,
    }),
    (dispatch, ownProps) => ({
      actions: (mapDispatchToProps ? mapDispatchToProps(dispatch, ownProps) : {}) as TActions,
    })
  );
};

export default connect;
