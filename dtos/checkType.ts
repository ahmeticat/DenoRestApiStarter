const checkType = (schema: any, value: any): [any, any] => {
  return schema.destruct()(value);
};

export default checkType;
