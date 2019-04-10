import * as React from 'react';
import UCheckbox from 'src/ui-components/UCheckbox';
import UInput from 'src/ui-components/UInput';

interface IParamsProps {
  convertToLower: boolean;
  deleteDuplicates: boolean;
  deleteNumberWords: boolean;
  sortByAlphabet: boolean;
  minimumHashtagLength: number;
  switchConvertToLower: () => void;
  switchDeleteDuplicates: () => void;
  switchDeleteNumberWords: () => void;
  switchSortByAlphabet: () => void;
  setMinimumHashtagLength: (length: number) => void;
}

const Params: React.FunctionComponent<IParamsProps> = props => {
  const {
    convertToLower,
    deleteDuplicates,
    deleteNumberWords,
    minimumHashtagLength,
    sortByAlphabet,
    switchConvertToLower,
    switchDeleteDuplicates,
    switchDeleteNumberWords,
    switchSortByAlphabet,
    setMinimumHashtagLength,
  } = props;
  const onChangeMinimumHashtagLength = (v: string) => setMinimumHashtagLength(Number(v) || 0);
  return (
    <div>
      <UCheckbox checked={convertToLower} onChange={switchConvertToLower}>
        перевести в нижний регистр
      </UCheckbox>
      <UCheckbox checked={sortByAlphabet} onChange={switchSortByAlphabet}>
        сортировать по алфавиту
      </UCheckbox>
      <UCheckbox checked={deleteDuplicates} onChange={switchDeleteDuplicates}>
        убрать дубликаты
      </UCheckbox>
      <UCheckbox checked={deleteNumberWords} onChange={switchDeleteNumberWords}>
        убрать хэштеги целиком из цифр
      </UCheckbox>
      <UInput
        type="number"
        placeholder="убрать хэштеги длиной менее"
        value={minimumHashtagLength.toString()}
        onChange={onChangeMinimumHashtagLength}
      />
    </div>
  );
};

export default Params;
