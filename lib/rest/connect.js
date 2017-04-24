let id = '';
let secretKey = '';

export default({ id: newId, secretKey: newSecretKey } = {}) => {
  if (!newId && !newSecretKey) return [id, secretKey];
  if (newId) id = newId;
  if (newSecretKey) secretKey = newSecretKey;
  return undefined;
};
