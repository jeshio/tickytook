import * as React from 'react';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UForm from 'src/ui-components/UForm';
import UGrid from 'src/ui-components/UGrid';

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

interface IParamsState {
  displayParams: boolean;
}

class Params extends React.PureComponent<IParamsProps, IParamsState> {
  public state = {
    displayParams: false,
  };

  public render() {
    const {
      convertToLower,
      deleteNumberWords,
      minimumHashtagLength,
      sortByAlphabet,
      switchConvertToLower,
      switchDeleteNumberWords,
      switchSortByAlphabet,
      setMinimumHashtagLength,
    } = this.props;
    const { displayParams } = this.state;
    const onChangeMinimumHashtagLength = (v: string) => setMinimumHashtagLength(Number(v) || 0);
    return (
      <React.Fragment>
        <UBlock my={0}>
          <UButton onClick={this.switchParamsDisplay} appearance="link" py={0}>
            {displayParams ? 'Скрыть параметры' : 'Показать параметры'}...
          </UButton>
        </UBlock>
        <UBlock visible={displayParams}>
          <UForm
            formValue={{
              minimumHashtagLength: minimumHashtagLength.toString(),
            }}
          >
            <UGrid.Row>
              <UGrid.Col md={7}>
                <UBlock marginLeft={2} marginTop={0}>
                  <UForm.Group>
                    <UForm.Input
                      name="minimumHashtagLength"
                      type="number"
                      placeholder="убрать хэштеги длиной менее"
                      onChange={onChangeMinimumHashtagLength}
                      label="Минимальная длина хэштега"
                    />
                  </UForm.Group>
                </UBlock>
              </UGrid.Col>
              <UGrid.Col md={5}>
                <UForm.Checkbox
                  name="convertToLower"
                  checked={convertToLower}
                  onChange={switchConvertToLower}
                >
                  перевести в нижний регистр
                </UForm.Checkbox>
              </UGrid.Col>
              <UGrid.Col md={5}>
                <UForm.Checkbox
                  name="sortByAlphabet"
                  checked={sortByAlphabet}
                  onChange={switchSortByAlphabet}
                >
                  сортировать по алфавиту
                </UForm.Checkbox>
              </UGrid.Col>
              <UGrid.Col md={6}>
                <UForm.Checkbox
                  name="deleteNumberWords"
                  checked={deleteNumberWords}
                  onChange={switchDeleteNumberWords}
                >
                  убрать хэштеги целиком из цифр
                </UForm.Checkbox>
              </UGrid.Col>
            </UGrid.Row>
          </UForm>
        </UBlock>
      </React.Fragment>
    );
  }

  private switchParamsDisplay = () => {
    this.setState(({ displayParams }) => ({ displayParams: !displayParams }));
  };
}

export default Params;
