//checks if store exists

export const IsCatalog = async (actor: any, storeId: any) => {
  if (!storeId || !actor) {
    return;
  }
  if (!actor.current) {
    return;
  }
  const info = await actor.current.getMetadataList(storeId);
  console.log("metadata", info);
  if (info && info.length > 0) {
    return true;
  } else {
    false;
  }
};
