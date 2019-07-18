import * as React from 'react';
import { ReactComponent as AutoModeIconComponent } from 'src/images/components/icons/auto-mode.svg';
import { ReactComponent as ManualModeIconComponent } from 'src/images/components/icons/manual-mode.svg';
import { ReactComponent as NewSpellIconComponent } from 'src/images/components/icons/reset.svg';
import UBlock from 'src/ui-components/UBlock';
import UButton from 'src/ui-components/UButton';
import UHorizontalList from 'src/ui-components/UHorizontalList';
import UIcon from 'src/ui-components/UIcon';
import USubHeader from 'src/ui-components/USubHeader';

interface IPresentationProps {
  reset: () => void;
  isExtendedMode: boolean;
  switchMode: () => void;
}

const itemCss = `
  margin-right: 0.5rem;
`;

const Presentation: React.FunctionComponent<IPresentationProps> = props => {
  return (
    <USubHeader>
      <UBlock visible={[false, true]}>
        <UHorizontalList
          items={[
            <UButton
              onClick={props.switchMode}
              icon={
                <UIcon
                  svg={props.isExtendedMode ? AutoModeIconComponent : ManualModeIconComponent}
                />
              }
              appearance="ghost"
              key={0}
            >
              {props.isExtendedMode ? 'Простой режим' : 'Расширенный режим'}
            </UButton>,
            <UButton
              appearance="ghost"
              onClick={props.reset}
              icon={<UIcon svg={NewSpellIconComponent} />}
              key={1}
            >
              Новое заклятие
            </UButton>,
          ]}
          itemCss={itemCss}
        />
      </UBlock>
    </USubHeader>
  );
};

export default Presentation;
