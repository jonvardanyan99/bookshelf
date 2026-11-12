export const deleteCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; max-age=0; path=/`;
};
