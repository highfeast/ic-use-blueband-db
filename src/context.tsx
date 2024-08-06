import React, { createContext, useContext, ReactNode, useRef } from "react";
import { LocalDocumentIndex } from "./db/LocalDocumentIndex";
import { Colorize } from "./utils/Colorize";
import { _SERVICE } from "./utils/blueband_db_provider.did";
import { BlueBand } from "./blueband";

type QueryResult =
  | undefined
  | {
      title: any;
      id: any;
      score: any;
      chunks: any;
      sections: any;
    }[];

interface VectorDBIndexContextType {
  isSaving: boolean;
  isQuerying: boolean;
  logs: string[];
  documents: any[];
  getStorePrincipal: () => Promise<any | undefined | string>;
  initializeIndex: (actor: any, store: string, config?: any) => void;
  AddItem: (title: string, content: string) => Promise<void>;
  Query: (prompt: string) => Promise<QueryResult>;
}

const VectorDBContext = createContext<VectorDBIndexContextType | undefined>(
  undefined
);

export const BluebandProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const actor = useRef<_SERVICE | null>(null);

  const [index, setIndex] = React.useState<LocalDocumentIndex | undefined>(
    undefined
  );
  const [db, setDB] = React.useState<BlueBand | null>(null);
  const [documents, setMyDocuments] = React.useState<any[]>([]);
  const [logs, setLogs] = React.useState<string[]>([]);
  const [isSaving, setIsLoading] = React.useState<boolean>(false);
  const [isQuerying, setIsQuerying] = React.useState<boolean>(false);

  const addLog = (message: string) => {
    setLogs((prevLogs: any) => [
      ...prevLogs,
      `[${new Date().toISOString()}] ${message}`,
    ]);
  };

  // creates an instance of localDocument index
  const initializeIndex = async (_actor: _SERVICE, collectionId: string) => {
    const _db = new BlueBand(actor, collectionId, addLog);
    if (_db) {
      const localIndex = await _db.initialize();

      setDB(_db);
      setIndex(localIndex);
      addLog(`Initialized local index for collection: ${collectionId}`);
      const result = await _db.getDocuments(collectionId);
      if (result) {
        setMyDocuments(result.documents);
      }
    }
  };
  const getStorePrincipal = async () => {
    if (!index || !db) {
      addLog("Error: Index not intitalized");
      return;
    }
    const result = await db.getCollectionPrincipal();
    return result;
  };

  // adds new document and saves vector
  const AddItem = React.useCallback(
    async (title: string, content: string) => {
      if (!index || !db || !content) {
        addLog("Error: Missing required data for adding document");
        return;
      }

      try {
        setIsLoading(true);
        const result = await db.addDocumentAndVector(index, title, content);
        addLog(`Document added successfully. ID: ${result.documentId!}`);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.error(e);
        addLog(`Error adding document: ${e}`);
      }
    },
    [index, db]
  );

  // queries local index
  const Query = React.useCallback(
    async (prompt: string) => {
      if (!index || !db) {
        addLog("Error: Index is not initialized");
        return;
      }
      try {
        setIsQuerying(true);
        const results = await db.similarityQuery(index, prompt);
        addLog(`Query processed ${results.length} results`);
        setIsQuerying(false);
        return results;
      } catch (e) {
        addLog(`Error in similarity query: ${e}`);
        setIsQuerying(false);
      }
    },
    [index, db, addLog]
  );

  return (
    <VectorDBContext.Provider
      value={{
        isSaving,
        isQuerying,
        documents,
        logs,
        getStorePrincipal,
        initializeIndex,
        AddItem,
        Query,
      }}
    >
      {children}
    </VectorDBContext.Provider>
  );
};

export const useBlueBand = () => {
  const context = useContext(VectorDBContext);
  if (context === undefined) {
    throw new Error("useVectorDB must be used within a VectorDBProvider");
  }
  return context;
};
