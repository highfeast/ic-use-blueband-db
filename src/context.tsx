import React, { createContext, useContext, ReactNode } from "react";
import { LocalDocumentIndex } from "./db/LocalDocumentIndex";
import { Colorize } from "./utils/Colorize";

interface VectorDBIndexContextType {
  store: string | null;
  isEmbedding: boolean;
  isQuerying: boolean;
  init: (actor: any, store: string) => void;
  saveEmbeddings: (
    docTitle: string,
    docId: string
  ) => Promise<{ docTitle: string; id: string | undefined }>;
  similarityQuery: (promptEmbedding: any) => Promise<any[]>;
}

const VectorDBContext = createContext<VectorDBIndexContextType | undefined>(
  undefined
);

export const VectorDBProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [localIndex, setLocalIndex] = React.useState<LocalDocumentIndex | null>(
    null
  );
  const [actor, setActor] = React.useState<any>(null);
  const [store, setStore] = React.useState<string | null>(null);
  const [isEmbedding, setIsEmbedding] = React.useState<boolean>(false);
  const [isQuerying, setIsQuerying] = React.useState<boolean>(false);

  //checks if store exists
  const loadIsCatalog = async (storeId: any) => {
    if (!storeId) {
      return;
    }
    const info = await actor.metadata(storeId);
    console.log("metadata", info);
    if (info && info.length > 0) {
      return true;
    } else {
      false;
    }
  };

  //returns title  of a document/recipe when a given document-id/recipe-id is passed
  const getDocumentTitle = async (docId: string) => {
    let responseCID = "";
    try {
      const info = await actor.recipeIDToTitle(store, docId);
      if (info[0]) {
        responseCID = info[0];
      }
    } catch (e) {
      console.log(e);
    }
    return responseCID;
  };

  //returns document-id/recipe-id when the  document/recipe title/name is passed
  const getDocumentID = async (title: string) => {
    let responseCID: any;
    try {
      const info = await actor.titleToRecipeID(store, title);
      if (info[0]) {
        responseCID = info[0];
      }
    } catch (e) {
      console.log(e);
    }
    return responseCID;
  };

  // creates an index instance of the vector-db
  const init = async (newActor: any, newStore: string) => {
    setActor(newActor);
    setStore(newStore);
    const isCatalog = await loadIsCatalog(newStore);
    const newLocalIndex = new LocalDocumentIndex({
      actor: newActor,
      indexName: newStore,
      isCatalog: isCatalog,
      _getDocumentId: getDocumentID,
      _getDoumentUri: getDocumentTitle,
      chunkingConfig: {
        chunkSize: 502,
      },
    });
    setLocalIndex(newLocalIndex);
  };

  // creates and saves embeddings of already added document
  const saveEmbeddings = async (docTitle: string, docId: string) => {
    if (!localIndex || !store) {
      throw new Error("LocalIndex not initialized");
    }

    let id: string | undefined;
    let documentResult: any;

    setIsEmbedding(true);

    try {
      //addvectors
      documentResult = await localIndex.addVectors(store, docTitle, docId);
      console.log(documentResult);

      id = documentResult.id;
      //end update
      const result = await actor.endUpdate(docId);
      console.log(
        Colorize.replaceLine(
          Colorize.success(`embeddings finished for document-id:"\n${result}`)
        )
      );
      setIsEmbedding(false);
    } catch (err) {
      console.log(
        Colorize.replaceLine(
          Colorize.error(
            `Error indexing: "${docTitle}"\n${(err as Error).message}`
          )
        )
      );
      setIsEmbedding(false);
    }
    return { docTitle, id };
  };

  // Performs a similarity check
  const similarityQuery = async (
    promptEmbedding: any[] | any,
    options?: {
      maxDocuments: number;
      maxChunks: number;
    }
  ) => {
    if (!localIndex || !store) {
      throw new Error("LocalIndex not initialized");
    }
    const queryResults: any = [];
    setIsQuerying(true);
    try {
      const results = await localIndex.queryDocuments(
        promptEmbedding,
        options ?? {
          maxDocuments: 4,
          maxChunks: 512,
        }
      );

      for (const result of results) {
        const resultObj: any = {
          tile: result.title,
          score: result.score,
          chunks: result.chunks.length,
          sections: [],
        };

        // Render sections if format is "sections"
        const tokens = 500;
        const sectionCount = 1;
        const overlap = true;
        const sections = await result.renderSections(
          tokens,
          sectionCount,
          overlap
        );
        resultObj.sections = sections.map((section, index) => ({
          title: sectionCount === 1 ? "Section" : `Section ${index + 1}`,
          score: section.score,
          tokens: section.tokenCount,
          text: section.text,
        }));

        queryResults.push(resultObj);
      }
      if (queryResults && queryResults.length > 0) {
        // Map through fetchContext and resolve promises
        const contextArray = await Promise.all(
          queryResults.map(async (x: any) => {
            const id = await getDocumentID(x.tile);
            return {
              tile: x.tile,
              id: id,
              ...x,
              sections: x.sections.map((y: any) => ({
                text: y.text
                  .replace(/\n+/g, "\n")
                  .replace(/\n/g, "\\n")
                  .replace(/"/g, '\\"'),
                tokens: y.tokens,
              })),
            };
          })
        );
        return contextArray;
      } else {
        return queryResults;
      }
      setIsQuerying(false);
    } catch (err) {
      setIsQuerying(false);
      Colorize.replaceLine(
        Colorize.error(
          `Error quering prompt embeddings: \n${(err as Error).message}`
        )
      );
    }
  };

  return (
    <VectorDBContext.Provider
      value={{
        store,
        isEmbedding,
        isQuerying,
        init,
        saveEmbeddings,
        similarityQuery,
      }}
    >
      {children}
    </VectorDBContext.Provider>
  );
};

export const useVectorDB = () => {
  const context = useContext(VectorDBContext);
  if (context === undefined) {
    throw new Error("useVectorDB must be used within a LocalIndexProvider");
  }
  return context;
};
