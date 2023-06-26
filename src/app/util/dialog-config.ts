export const getDialogConfig = (data: { [key: string]: any }) => {
  return {
    width: '400',
    minHeight: '200',
    autoFocus: false,
    data,
  };
};
