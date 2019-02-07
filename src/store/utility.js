const updateObject = (oldObject, updatedvalues) => {
  return {
    ...oldObject,
    ...updatedvalues
  };
};

export default updateObject;