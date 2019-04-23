import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import UCheckbox from 'src/ui-components/UCheckbox';
import UForm from 'src/ui-components/UForm';

interface IParamsProps {
  convertToLower: boolean;
  deleteNumberWords: boolean;
  sortByAlphabet: boolean;
  minimumHashtagLength: number;
  switchConvertToLower: () => void;
  switchDeleteNumberWords: () => void;
  switchSortByAlphabet: () => void;
  setMinimumHashtagLength: (length: number) => void;
}

const Params: React.FunctionComponent<IParamsProps> = props => {
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
    <UBlock>
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
        <UBlock marginLeft={2} marginTop={0}>
          <UForm.Group>
            <UForm.Label>Минимальная длина хэштега</UForm.Label>
            <UForm.Input
              name="minimumHashtagLength"
              type="number"
              placeholder="убрать хэштеги длиной менее"
              onChange={onChangeMinimumHashtagLength}
            />
          </UForm.Group>
        </UBlock>
      </UForm>
    </UBlock>
  );
};

export default Params;
