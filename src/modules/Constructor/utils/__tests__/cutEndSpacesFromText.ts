import cutEndSpacesFromText from '../cutEndSpacesFromText';

describe('cutEndSpacesFromText', () => {
  it('пустой текст', () => {
    const text = '';
    expect(cutEndSpacesFromText(text)).toEqual(text);
  });

  it('текст без переносов', () => {
    const text = 'Ваня рано встал и  позавтракал';
    expect(cutEndSpacesFromText(text)).toEqual(text);
  });

  it('текст с переносом', () => {
    const text = `Ваня рано встал и 
    позавтракал`;
    expect(cutEndSpacesFromText(text)).toEqual(`Ваня рано встал и
    позавтракал`);
  });

  it('текст с несколькими переносами', () => {
    const text = `Ваня рано 
    встал и  
    позавтракал `;
    expect(cutEndSpacesFromText(text)).toEqual(`Ваня рано
    встал и
    позавтракал`);
  });
});
