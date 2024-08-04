import React, { createContext, useContext, ReactNode, useRef } from "react";
import { LocalDocumentIndex } from "./db/LocalDocumentIndex";
import { Colorize } from "./utils/Colorize";
import { _SERVICE } from "./utils/blueband_db_provider.did"
import { TextSplitterConfig } from "./db/TextSplitter";

interface VectorDBIndexContextType {
  store: string | null;
  isEmbedding: boolean;
  isQuerying: boolean;
  init: (actor: any, store: string, config: any) => void;
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
  // const [actor, setActor] = React.useState<_SERVICE | null>(null);
  const actor = useRef<_SERVICE | null>(null);
  const [store, setStore] = React.useState<string | null>(null);
  const [isEmbedding, setIsEmbedding] = React.useState<boolean>(false);
  const [isQuerying, setIsQuerying] = React.useState<boolean>(false);

  const IsDocExists = async (storeId: any) => {
    if (!storeId || !actor || !actor.current) {
      return;
    }
    const info = await actor.current.getMetadataList(storeId);
    if (info && info.length > 0) {
      return true;
    }
    return false;
  };

  // creates an instance of localDocument index
  const init = async (newActor: any, _store: string, api_key: string) => {
    const isCatalog = await IsDocExists(_store);
    const newLocalIndex = new LocalDocumentIndex({
      actor: newActor,
      indexName: _store,
      apiKey: api_key,
      isCatalog: isCatalog,
      chunkingConfig: {
        chunkSize: 502,
      },
    });
    actor.current = newActor;
    setStore(_store);
    setLocalIndex(newLocalIndex);
  };

  // creates and saves embeddings of already added document
  const saveEmbeddings = async (docTitle: string, docId: string) => {
    if (!localIndex || !store || !actor.current) {
      throw new Error("Index not initialized");
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
      const result = await actor.current.endUpdate(docId);
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

  // Performs a similarity check - TODO: customize chunk config
  const similarityQuery = async (promptEmbedding: any[] | any) => {
    if (!localIndex || !store || !actor) {
      throw new Error("LocalIndex-query not initialized");
    }
    const queryResults: any = [];
    setIsQuerying(true);
    try {
      const results = await localIndex.queryDocuments(promptEmbedding, {
        maxDocuments: 4,
        maxChunks: 512,
      });

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
      console.log("these are the query results", queryResults);
      if (queryResults && queryResults.length > 0) {
        // Map through fetchContext and resolve promises
        const contextArray = await Promise.all(
          queryResults.map(async (x: any) => {
            const id = await actor.current?.titleToDocumentID(store, x.tile);
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
        setIsQuerying(false);
        return contextArray ?? queryResults;
      } else {
        setIsQuerying(false);
        return queryResults;
      }
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
    throw new Error("useVectorDB must be used within a VectorDBProvider");
  }
  return context;
};
