import * as React from 'react';
import { ReactComponent as SpellIconComponent } from 'src/images/components/icons/magic-wand.svg';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UFlexboxGrid from 'src/ui-components/UFlexboxGrid';
import UForm from 'src/ui-components/UForm';
import UGrid from 'src/ui-components/UGrid';
import UIcon from 'src/ui-components/UIcon';
import UIconButton from 'src/ui-components/UIconButton';
import styled from 'styled-components';
import { display } from 'styled-system';

interface IParamsProps {
  convertToLower: boolean;
  deleteNumberWords: boolean;
  sortByAlphabet: boolean;
  minimumHashtagLength: number;
  isExtendedMode: boolean;
  switchConvertToLower: () => void;
  switchDeleteNumberWords: () => void;
  switchSortByAlphabet: () => void;
  setMinimumHashtagLength: (length: number) => void;
  switchMode: () => void;
  onFormSubmit?: () => void;
}

interface IParamsState {
  displayParams: boolean;
}

const FlexUGridRow = styled(UGrid.Row)`
  ${display};
  align-items: center;
  flex-wrap: wrap;
`;

const Button = styled(({ Component, ...props }) => <Component {...props} />)`
  border-radius: 5px;
  min-width: 50%;
`;

const Controls = styled(UBlock)`
  margin-top: 0.5rem;
  text-align: center;
`;

class Params extends React.PureComponent<IParamsProps, IParamsState> {
  public static defaultProps = {
    onFormSubmit: () => {},
  };

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
      switchMode,
      isExtendedMode,
    } = this.props;
    const { displayParams } = this.state;
    const onChangeMinimumHashtagLength = (v: string) => setMinimumHashtagLength(Number(v) || 0);
    return (
      <UForm
        formValue={{
          minimumHashtagLength: minimumHashtagLength.toString(),
        }}
      >
        <UFlexboxGrid flexDirection={['column', 'row']} align="middle">
          <UFlexboxGrid.Item>
            <UBlock my={0} textAlign={['center', 'right']}>
              <UButton onClick={this.switchParamsDisplay} appearance="link" py={0}>
                {displayParams ? 'Скрыть параметры' : 'Показать параметры'}...
              </UButton>
            </UBlock>
          </UFlexboxGrid.Item>
        </UFlexboxGrid>
        <UBlock visible={displayParams}>
          <FlexUGridRow display={isExtendedMode ? ['block', 'block', 'flex'] : ['block', 'flex']}>
            <UGrid.Col sm={isExtendedMode ? 7 : 12}>
              <UBlock marginLeft={2} marginTop={0} visible={[false, false, true]}>
                <UForm.Input
                  name="minimumHashtagLength"
                  type="number"
                  placeholder="убрать хэштеги длиной менее"
                  onChange={onChangeMinimumHashtagLength}
                  label="Минимальная длина хэштега"
                />
              </UBlock>
              <UBlock marginLeft={2} marginTop={0} visible={[true, true, false]}>
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
            </UGrid.Col>
            <UGrid.Col sm={isExtendedMode ? 5 : 12}>
              <UForm.Checkbox
                name="convertToLower"
                checked={convertToLower}
                onChange={switchConvertToLower}
              >
                перевести в нижний регистр
              </UForm.Checkbox>
            </UGrid.Col>
            <UGrid.Col sm={isExtendedMode ? 5 : 12}>
              <UForm.Checkbox
                name="sortByAlphabet"
                checked={sortByAlphabet}
                onChange={switchSortByAlphabet}
              >
                сортировать по алфавиту
              </UForm.Checkbox>
            </UGrid.Col>
            <UGrid.Col sm={isExtendedMode ? 6 : 12}>
              <UForm.Checkbox
                name="deleteNumberWords"
                checked={deleteNumberWords}
                onChange={switchDeleteNumberWords}
              >
                убрать хэштеги целиком из цифр
              </UForm.Checkbox>
            </UGrid.Col>
          </FlexUGridRow>
        </UBlock>
        <Controls visible={!this.props.isExtendedMode}>
          <Button
            Component={UButton}
            appearance="primary"
            icon={<UIcon svg={SpellIconComponent} size="small" />}
            color="blue"
            type="submit"
            onClick={this.props.onFormSubmit}
          >
            Наколдовать!
          </Button>
        </Controls>
      </UForm>
    );
  }

  private switchParamsDisplay = () => {
    this.setState(({ displayParams }) => ({ displayParams: !displayParams }));
  };
}

export default Params;
