import ICAction from '../interfaces/ICAction';

export type ActionsFromActionsParameters<ActionsParametersT extends any> = {
  [P in keyof ActionsParametersT]: (
    ...args: ActionsParametersT[P]
  ) => ICAction<ActionsParametersT[P]>
};
