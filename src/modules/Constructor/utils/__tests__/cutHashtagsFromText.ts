import cutHashtagsFromText from '../cutHashtagsFromText';

describe('cutHashtagsFromText', () => {
  it('пустой текст', () => {
    expect(cutHashtagsFromText('')).toEqual('');
  });

  it('текст с хэштегами через пробел в конце строки', () => {
    const text = `Я сидел и смотрел, а там пусто #сидел #смотрел #пустота`;
    expect(cutHashtagsFromText(text)).toEqual('Я сидел и смотрел, а там пусто');
  });

  it('текст с хэштегами как попало в конце строки', () => {
    const text = `Я сидел и смотрел, а там пусто #сидел#смотрел #пустота`;
    expect(cutHashtagsFromText(text)).toEqual('Я сидел и смотрел, а там пусто');
  });

  it('текст с точкой + хэштеги как попало в конце строки', () => {
    const text = `Я сидел и смотрел, а там пусто. #сидел#смотрел #пустота`;
    expect(cutHashtagsFromText(text)).toEqual('Я сидел и смотрел, а там пусто.');
  });

  it('текст + хэштег + точка', () => {
    const text = `не сильно #сложно.`;
    expect(cutHashtagsFromText(text)).toEqual('не сильно сложно.');
  });

  // it('текст + хэштег + emoji', () => {
  //   const text = `не сильно #сложно👉`;
  //   expect(cutHashtagsFromText(text)).toEqual('не сильно сложно👉');
  // });

  it('текст с хэштегами как попало в начале строки', () => {
    const text = `#сидел#смотрел #пустота Я сидел и смотрел, а там пусто`;
    expect(cutHashtagsFromText(text)).toEqual('Я сидел и смотрел, а там пусто');
  });

  it('текст с хэштегами как попало в конце и начале строки', () => {
    const text = `#сидел#смотрел #пустота Я сидел и смотрел, а там пусто #а #вот#так`;
    expect(cutHashtagsFromText(text)).toEqual('Я сидел и смотрел, а там пусто');
  });

  it('текст с хэштегами смешанными со строкой', () => {
    const text = `#Я сидел и #смотрел, а#там пусто`;
    expect(cutHashtagsFromText(text)).toEqual('Я сидел и смотрел, а там пусто');
  });

  it('текст с хэштегами смешанными со строкой #2', () => {
    const text = `test #dd df`;
    expect(cutHashtagsFromText(text)).toEqual('test dd df');
  });

  it('текст с хэштегами смешанными со строкой #3', () => {
    const text = `t #dd f`;
    expect(cutHashtagsFromText(text)).toEqual('t dd f');
  });

  it('текст с хэштегами смешанными со строкой + хэштеги в конце строки', () => {
    const text = `#Я сидел и #смотрел, а#там пусто#тест #ещё #один`;
    expect(cutHashtagsFromText(text)).toEqual('Я сидел и смотрел, а там пусто');
  });

  it('текст с хэштегами смешанными со строкой + хэштеги в конце строки и точка', () => {
    const text = `#Я сидел и #смотрел, а#там пусто#тест #ещё #один.`;
    expect(cutHashtagsFromText(text)).toEqual('Я сидел и смотрел, а там пусто тест ещё один.');
  });

  it('текст с хэштегами смешанными со строкой + хэштеги с дефисами в конце строки', () => {
    const text = `#Я сидел и #смотрел, а#там пусто#тест #ещё-один`;
    expect(cutHashtagsFromText(text)).toEqual('Я сидел и смотрел, а там пусто тест ещё-один');
  });

  it('текст + хэштеги с дефисами в конце строки', () => {
    const text = `Я сидел и смотрел, а там пусто#тест #ещё-один`;
    expect(cutHashtagsFromText(text)).toEqual('Я сидел и смотрел, а там пусто тест ещё-один');
  });

  it('текст с переносами строк, хэштегами смешанными со строкой + хэштеги в конце строки', () => {
    const text = `#Я сидел
    и#смотрел, а#там пусто#тест
    #ещё #один`;
    const resultText = `Я сидел
    и смотрел, а там пусто`;
    expect(cutHashtagsFromText(text)).toEqual(resultText);
  });
});
