import { buildFields } from "ra-data-hasura";
import extensions from "./extensions";

const extractFieldsFromQuery = (queryAst) => {
  return queryAst.definitions[0].selectionSet.selections;
};

export const customBuildFields = (type, fetchType) => {
  const resourceName = type.name;
  const defaultFields = buildFields(type, fetchType);

  const extendedObj = extensions.find(
    (el) => el.resourceName === resourceName && el.fetchType === fetchType
  );

  if (extendedObj) {
    const relatedEntities = extractFieldsFromQuery(extendedObj.query);
    defaultFields.push(...relatedEntities);
  }

  return defaultFields;
};

export const customBuildArgs = (queryType, variables) => {
  return variables;
};
