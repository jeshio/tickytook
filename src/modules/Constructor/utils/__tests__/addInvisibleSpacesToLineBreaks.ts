import addInveasibleSpacesToLineBreaks from '../addInvisibleSpacesToLineBreaks';

describe('addInvisibleSpacesToLineBreaks', () => {
  it('пустой текст', () => {
    const text = '';
    expect(addInveasibleSpacesToLineBreaks(text)).toEqual(text);
  });

  it('текст без переносов', () => {
    const text = 'Ваня рано встал и  позавтракал';
    expect(addInveasibleSpacesToLineBreaks(text)).toEqual(text);
  });

  it('текст с одним переносом', () => {
    const text = `Ваня рано встал и
    позавтракал`;
    expect(addInveasibleSpacesToLineBreaks(text)).toEqual(`Ваня рано встал и
    позавтракал`);
  });

  it('текст с двойным переносом', () => {
    const text = `Ваня рано встал и

    позавтракал`;
    expect(addInveasibleSpacesToLineBreaks(text)).toEqual(`Ваня рано встал и
⠀
    позавтракал`);
  });

  it('текст с несколькими переносами', () => {
    const text = `Ваня рано

    встал и

    позавтракал`;
    expect(addInveasibleSpacesToLineBreaks(text)).toEqual(`Ваня рано
⠀
    встал и
⠀
    позавтракал`);
  });

  it('текст с несколькими переносами подряд', () => {
    const text = `Ваня рано


    встал и




    позавтракал`;
    expect(addInveasibleSpacesToLineBreaks(text)).toEqual(`Ваня рано
⠀
⠀
    встал и
⠀
⠀
⠀
⠀
    позавтракал`);
  });
});
