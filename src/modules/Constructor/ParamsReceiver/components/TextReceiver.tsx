import * as React from 'react';
import TTheme from 'src/core/types/TTheme';
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

  public componentDidMount() {
    try {
      if (this.fieldRef.current) {
        (this.fieldRef.current as any)._ref.focus();
      }
    } catch (e) {}
  }

  public render() {
    const { value, onChange, onFormSubmit } = this.props;
    return (
      <Root>
        <UForm formValue={{ text: value }} onSubmit={onFormSubmit}>
          <UFlexboxGrid flexWrap="nowrap" justify="space-between">
            <Step>1</Step>
            <UFlexboxGrid.Item flex={3}>
              <Textarea
                placeholder="Напишите сюда заклятие (текст или хэштеги)..."
                rows={1}
                name="text"
                onChange={onChange}
                autoHeight={true}
                inputRef={this.fieldRef}
                paddingTop={['6px', 4]}
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
}

export interface $TextReceiver {
  textReceiver: typeof TextReceiver;
}
