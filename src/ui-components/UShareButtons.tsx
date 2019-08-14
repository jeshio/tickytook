import * as React from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
} from 'react-share';
import UBlock from './UBlock';

interface IUShareButtonsProps {
  align?: 'center' | 'flex-end' | 'flex-start';
  iconSize?: number;
}

const UShareButtons: React.FunctionComponent<IUShareButtonsProps> = props => {
  const url = window.location.href;
  const buttons = [
    [VKShareButton, VKIcon, 'ВКонтакте'],
    [TelegramShareButton, TelegramIcon, 'Telegram'],
    [TwitterShareButton, TwitterIcon, 'Twitter'],
    [FacebookShareButton, FacebookIcon, 'Facebook'],
    [InstapaperShareButton, InstapaperIcon, 'Instapaper'],
    [EmailShareButton, EmailIcon, 'Отправить на почту'],
  ];

  return (
    <UBlock display="flex" justifyContent={props.align} alignItems="center">
      {buttons.map((item, index) => (
        <UBlock key={index} px={1} title={item[2]}>
          {React.createElement(
            item[0] as React.ElementType,
            { url },
            React.createElement(item[1] as React.ElementType, { round: true, size: props.iconSize })
          )}
        </UBlock>
      ))}
    </UBlock>
  );
};

UShareButtons.defaultProps = {
  align: 'center',
  iconSize: 36,
};

export default UShareButtons;
