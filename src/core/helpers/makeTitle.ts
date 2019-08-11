import truncate from 'lodash/truncate';

export default function makeTitle(title: string) {
  return `${truncate(title, { length: 29, omission: '..' })} • генератор хэштегов Тикитук`;
}
