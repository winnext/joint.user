export default class ApiError extends Error {
  constructor(message:string, filePath:string, stack: any = null) {
    const fileArr = filePath.split('/');
    const fileName = ` In ${fileArr[fileArr.length - 1].split('.')[0]}`;
    super(message + fileName);
    this.stack = stack;
  }
}
