import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import ICApiAction from '../store/interfaces/ICApiAction';

export default function bindActionCreatorsWithApi<M extends ActionCreatorsMapObject<any>>(
  actionCreators: M,
  dispatch: Dispatch
) {
  const apiActions = Object.keys(actionCreators).filter(actionName => {
    const action = (actionCreators[actionName] as unknown) as ICApiAction;

    return action.request && action.success && action.failure;
  });
  return {
    ...bindActionCreators(actionCreators, dispatch),
    ...apiActions.reduce((base, actionName) => {
      const action = (actionCreators[actionName] as unknown) as ICApiAction;
      return {
        ...base,
        [actionName]: {
          request: bindActionCreators(action.request, dispatch),
          success: bindActionCreators(action.success, dispatch),
          failure: bindActionCreators(action.failure, dispatch),
        },
      };
    }, {}),
  };
}
