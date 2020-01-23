const check = new Function (
  'try {return this===window;}catch(e){ return false;}'
);
const isBrowser = check ();

export default !isBrowser;
