import moment from 'moment';

export const KEY_CODE = {
  E: 69, //e
  PLUS: 189, // +
  PLUS_NUMBER: 107, // +
  SUB_TRACTION: 187, // -
  SUB_TRACTION_NUMBER: 109, // -
  ZERO: 98, // 0
  BACK_SPACE: 8, // Backspace
  ARROW_DOWN: 40, // arrow down
  ARROW_UP: 38, // arrow up
  POINT: 190, // .
  NUMBER_POINT: 110, // .
  COMMA: 188, // ,
  EE: 231, // ê
};

export const ellipseAddress = (
  address = '',
  maxCharacters = 5,
  maxLastCharacters?: number | undefined,
): string => {
  if (!address) return '';

  return `${address.slice(0, maxCharacters)}...${address.slice(
    -(maxLastCharacters ? maxLastCharacters : maxCharacters),
  )}`;
};

export const decimalCount = (number: any) => {
  const numberAsString = number?.toString();
  if (numberAsString?.includes('.')) {
    return numberAsString?.split('.')?.[1]?.length;
  }
  return 0;
};

export const handleOnKeyDownInputNumber = async (
  event: any,
  regex: any = new RegExp(/^(?!$)\d{0,10}(?:\.\d{1,5})?$/),
) => {
  const value = event.target.value?.toString()?.replaceAll(',', '.');
  const pattern = regex;
  if (
    event.keyCode === KEY_CODE.E ||
    event.keyCode === KEY_CODE.EE ||
    event.keyCode === KEY_CODE.PLUS ||
    event.keyCode === KEY_CODE.PLUS_NUMBER ||
    event.keyCode === KEY_CODE.SUB_TRACTION ||
    event.keyCode === KEY_CODE.SUB_TRACTION_NUMBER ||
    event.keyCode === KEY_CODE.ARROW_DOWN ||
    event.keyCode === KEY_CODE.ARROW_UP ||
    (!pattern?.test(value) && value && event.keyCode !== KEY_CODE.BACK_SPACE) ||
    (!value &&
      (event.keyCode === KEY_CODE.POINT ||
        event.keyCode === KEY_CODE.NUMBER_POINT ||
        event.keyCode === KEY_CODE.COMMA))
  ) {
    event.preventDefault();
  }
};

export const handleOnKeyDownInputPercent = (event: any) => {
  const value = event.target.value?.toString()?.replaceAll(',', '.');
  const pattern = /^(?!$)\d{0,10}(?:\.\d{1,2})?$/;
  // keyCode = 69: e ,189: + ,187: -,8: Backspace,96: 0
  if (
    event.keyCode === KEY_CODE.E ||
    event.keyCode === KEY_CODE.EE ||
    event.keyCode === KEY_CODE.PLUS ||
    event.keyCode === KEY_CODE.PLUS_NUMBER ||
    event.keyCode === KEY_CODE.SUB_TRACTION ||
    event.keyCode === KEY_CODE.SUB_TRACTION_NUMBER ||
    event.keyCode === KEY_CODE.ARROW_DOWN ||
    event.keyCode === KEY_CODE.ARROW_UP ||
    (!pattern.test(value) && value && event.keyCode !== KEY_CODE.BACK_SPACE) ||
    (!value &&
      (event.keyCode === KEY_CODE.POINT ||
        event.keyCode === KEY_CODE.NUMBER_POINT ||
        event.keyCode === KEY_CODE.COMMA))
  ) {
    event.preventDefault();
  }
};

export const handleOnKeyDownInputSlippage = (event: any) => {
  const value = event.target.value?.toString()?.replaceAll(',', '.');
  const pattern = /^(?!$)\d{0,2}(?:\.\d{1,1})?$/;
  // keyCode = 69: e ,189: + ,187: -,8: Backspace,96: 0
  if (
    event.keyCode === KEY_CODE.E ||
    event.keyCode === KEY_CODE.EE ||
    event.keyCode === KEY_CODE.PLUS ||
    event.keyCode === KEY_CODE.PLUS_NUMBER ||
    event.keyCode === KEY_CODE.SUB_TRACTION ||
    event.keyCode === KEY_CODE.SUB_TRACTION_NUMBER ||
    event.keyCode === KEY_CODE.ARROW_DOWN ||
    event.keyCode === KEY_CODE.ARROW_UP ||
    (!pattern.test(value) && value && event.keyCode !== KEY_CODE.BACK_SPACE) ||
    (!value &&
      (event.keyCode === KEY_CODE.POINT ||
        event.keyCode === KEY_CODE.NUMBER_POINT ||
        event.keyCode === KEY_CODE.COMMA))
  ) {
    event.preventDefault();
  }
};

export const generatePrecision = (value: string) => {
  if (value?.includes('.')) {
    return value?.split('.')[1].length;
  } else {
    return 0;
  }
};

export const renderLang = (language: string) => {
  if (language && language?.includes('en')) {
    return 'en';
  }
  if (language && language?.includes('vi')) {
    return 'vi';
  } else {
    return language;
  }
};

export function iOS() {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform,
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}

export const sliceString = (text: string, end = 30) => {
  if (text?.length > end) return `${text.slice(0, end)}...`;

  return text;
};

export const getTimeAgo = (timestampStr: string): string => {
  const timestampMs = Number(timestampStr) * 1000;
  const date = moment(timestampMs);
  const now = moment();

  const diffInDays = now.diff(date, 'days');
  if (diffInDays > 0) {
    return `${diffInDays} Day${diffInDays > 1 ? 's' : ''} `;
  }

  const diffInHours = now.diff(date, 'hours');
  return `${diffInHours} Hour${diffInHours > 1 ? 's' : ''} `;
};

export const formatTime = (date: string) => {
  const time = moment.unix(Number(date)).format('DD/MM/YYYY hh:mm:ss');
  return time;
};

export const changeTimeStamp = (time: any) => {
  const date = new Date(time);
  return Math.floor(date.getTime() / 1000.0).toString();
};
