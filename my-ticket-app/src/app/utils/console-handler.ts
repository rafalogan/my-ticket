import { environment } from 'src/environments/environment';

const isValid = !environment.production || environment.debug;

export const onLog = (...data: any[]) => {
  const [title, ...rest] = data;
  if (isValid) return console.log(title, ...rest);
};

export const onError = (...data: any[]) => {
  const [title, ...rest] = data;
  return console.error(title, ...rest);
};

export const onWarn = (...data: any[]) => {
  const [title, ...rest] = data;
  return console.warn(title, ...rest);
};

export const onDebug = (...data: any[]) => {
  const [title, ...rest] = data;
  if (isValid) return console.debug('title', ...rest);
};
