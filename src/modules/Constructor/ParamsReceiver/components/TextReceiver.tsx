import debounce from 'lodash/debounce';
import * as React from 'react';
import { ReactComponent as SpellIconComponent } from 'src/images/components/icons/magic-wand.svg';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UFlexboxGrid from 'src/ui-components/UFlexboxGrid';
import UForm from 'src/ui-components/UForm';
import UIcon from 'src/ui-components/UIcon';
import UIconButton from 'src/ui-components/UIconButton';
import UInline from 'src/ui-components/UInline';
import UStep from 'src/ui-components/UStep';
import styled from 'styled-components';
import { space } from 'styled-system';

export interface TextReceiverProps {
  value: string;
  onChange: (text: string) => void;
  onFormSubmit: () => void;
  isExtendedMode: boolean;
}

const Root = styled.div<React.ImgHTMLAttributes<HTMLDivElement> & { isExtendedMode?: boolean }>`
  position: relative;
  padding-left: ${({ isExtendedMode }: any) => (isExtendedMode ? '48px' : 0)};
`;

const Textarea = styled(({ paddingTop, isExtendedMode, ...props }) => (
  <UForm.Textarea {...props} />
))`
  ${({ isExtendedMode }: any) => (isExtendedMode ? 'border-radius: 0;' : '')}
  min-height: ${({ isExtendedMode }: any) => (isExtendedMode ? '48px' : '60px')} !important;
  ${space};
`;

const Step = styled(UStep)`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 5px 0 0 5px;
`;

const Button = styled(({ Component, ...props }) => <Component {...props} />)`
  border-radius: 0 5px 5px 0;
  height: 48px;
  min-width: 48px;
`;

const ShortBlockButton = styled(({ Component, ...props }) => <Component {...props} />)`
  border-radius: 5px;
  min-width: 50%;
`;

const ShortBlockControls = styled(UBlock)`
  margin-top: 0.5rem;
  text-align: center;
`;

export default class TextReceiver extends React.PureComponent<TextReceiverProps, any> {
  private fieldRef = React.createRef();
  private onChange: Pick<TextReceiverProps, 'onChange'>['onChange'];

  constructor(props: TextReceiverProps) {
    super(props);

    this.onChange = debounce(props.onChange, 500);
    this.onFormSubmit = debounce(this.onFormSubmit, 0);
    this.state = {
      cachedValue: props.value,
    };
  }

  public componentDidMount() {
    try {
      if (this.fieldRef.current) {
        (this.fieldRef.current as any)._ref.focus();
      }
    } catch (e) {}
  }

  public componentDidUpdate(prevProps: TextReceiverProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ cachedValue: this.props.value });
    }
  }

  public render() {
    const { cachedValue } = this.state;
    const { isExtendedMode } = this.props;
    const { handleTextChange, onFormSubmit } = this;
    return (
      <Root isExtendedMode={isExtendedMode}>
        <UForm formValue={{ text: cachedValue }} onSubmit={onFormSubmit}>
          <UFlexboxGrid flexWrap="nowrap" justify="space-between">
            {isExtendedMode && <Step>1</Step>}
            <UFlexboxGrid.Item flex={3}>
              <Textarea
                placeholder="Напишите сюда текст поста..."
                rows={1}
                name="text"
                onChange={handleTextChange}
                autoHeight={true}
                inputRef={this.fieldRef}
                paddingTop={isExtendedMode ? ['6px', '6px', 4] : undefined}
                onPaste={onFormSubmit}
                isExtendedMode={isExtendedMode}
              />
            </UFlexboxGrid.Item>
            <UFlexboxGrid.Item>
              <UInline visible={this.props.isExtendedMode}>
                <Button
                  Component={UButton}
                  appearance="primary"
                  visible={[false, true]}
                  icon={<UIcon svg={SpellIconComponent} size="small" />}
                  color="blue"
                  type="submit"
                  onClick={onFormSubmit}
                >
                  Наколдовать!
                </Button>
                <Button
                  Component={UIconButton}
                  appearance="primary"
                  visible={[true, false]}
                  svg={SpellIconComponent}
                  style={{ padding: '12px' }}
                  color="blue"
                  type="submit"
                  onClick={onFormSubmit}
                />
              </UInline>
            </UFlexboxGrid.Item>
          </UFlexboxGrid>
          <ShortBlockControls visible={!this.props.isExtendedMode}>
            <ShortBlockButton
              Component={UButton}
              appearance="primary"
              icon={<UIcon svg={SpellIconComponent} size="small" />}
              color="blue"
              type="submit"
              onClick={onFormSubmit}
            >
              Наколдовать!
            </ShortBlockButton>
          </ShortBlockControls>
        </UForm>
      </Root>
    );
  }

  private handleTextChange = (value: string) => {
    this.setState({
      cachedValue: value,
    });
    this.onChange(value);
  };

  private onFormSubmit = () => {
    this.props.onChange(this.state.cachedValue);
    this.props.onFormSubmit();
  };
}

export interface $TextReceiver {
  textReceiver: typeof TextReceiver;
}
