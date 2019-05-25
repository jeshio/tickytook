import debounce from 'lodash/debounce';
import * as React from 'react';
import { ReactComponent as SpellIconComponent } from 'src/images/icons/magic-wand.svg';
import UButton from 'src/ui-components/UButton';
import UFlexboxGrid from 'src/ui-components/UFlexboxGrid';
import UForm from 'src/ui-components/UForm';
import UIcon from 'src/ui-components/UIcon';
import UIconButton from 'src/ui-components/UIconButton';
import UStep from 'src/ui-components/UStep';
import UTextarea from 'src/ui-components/UTextarea';
import styled from 'styled-components';
import { borderRadius, space } from 'styled-system';

export interface TextReceiverProps {
  value: string;
  onChange: (text: string) => void;
  onFormSubmit: () => void;
}

interface TextReceiverState {
  cachedValue: string;
}

const Root = styled.div`
  position: relative;
  padding-left: 48px;
`;

const Textarea = styled(({ paddingTop, ...props }) => <UForm.Textarea {...props} />)`
  border-radius: 0;
  min-height: 48px !important;
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
    const { handleTextChange, onFormSubmit } = this;
    return (
      <Root>
        <UForm formValue={{ text: cachedValue }} onSubmit={onFormSubmit}>
          <UFlexboxGrid flexWrap="nowrap" justify="space-between">
            <Step>1</Step>
            <UFlexboxGrid.Item flex={3}>
              <Textarea
                placeholder="Напишите сюда текст поста..."
                rows={1}
                name="text"
                onChange={handleTextChange}
                autoHeight={true}
                inputRef={this.fieldRef}
                paddingTop={['6px', '6px', 4]}
                onPaste={onFormSubmit}
              />
            </UFlexboxGrid.Item>
            <UFlexboxGrid.Item>
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
            </UFlexboxGrid.Item>
          </UFlexboxGrid>
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
