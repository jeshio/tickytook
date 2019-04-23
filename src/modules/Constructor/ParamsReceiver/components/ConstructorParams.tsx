import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import UForm from 'src/ui-components/UForm';

interface IConstructorParamsProps {
  convertToLower: boolean;
  deleteNumberWords: boolean;
  sortByAlphabet: boolean;
  minimumHashtagLength: number;
  switchConvertToLower: () => void;
  switchDeleteNumberWords: () => void;
  switchSortByAlphabet: () => void;
  setMinimumHashtagLength: (length: number) => void;
}

const ConstructorParams: React.FunctionComponent<IConstructorParamsProps> = props => {
  const {
    convertToLower,
    deleteNumberWords,
    minimumHashtagLength,
    sortByAlphabet,
    switchConvertToLower,
    switchDeleteNumberWords,
    switchSortByAlphabet,
    setMinimumHashtagLength,
  } = props;
  const onChangeMinimumHashtagLength = (v: string) => setMinimumHashtagLength(Number(v) || 0);
  return (
    <UBlock marginTop={0}>
      <UForm
        formValue={{
          minimumHashtagLength: minimumHashtagLength.toString(),
        }}
      >
        <UForm.Checkbox
          name="convertToLower"
          checked={convertToLower}
          onChange={switchConvertToLower}
        >
          перевести в нижний регистр
        </UForm.Checkbox>
        <UForm.Checkbox
          name="sortByAlphabet"
          checked={sortByAlphabet}
          onChange={switchSortByAlphabet}
        >
          сортировать по алфавиту
        </UForm.Checkbox>
        <UForm.Checkbox
          name="deleteNumberWords"
          checked={deleteNumberWords}
          onChange={switchDeleteNumberWords}
        >
          убрать хэштеги целиком из цифр
        </UForm.Checkbox>
        <UForm.Group>
          <UForm.Label>Минимальная длина хэштега</UForm.Label>
          <UForm.Input
            name="minimumHashtagLength"
            type="number"
            placeholder="убрать хэштеги длиной менее"
            onChange={onChangeMinimumHashtagLength}
          />
        </UForm.Group>
      </UForm>
    </UBlock>
  );
};

export default ConstructorParams;
