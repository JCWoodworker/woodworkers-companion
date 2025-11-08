/**
 * Individual Boards Hook
 * Manage individual board tracking within lumber entries
 */

import { useState, useCallback } from 'react';
import { IndividualBoard } from '@/src/types/inventory';
import { generateUniqueId } from '@/src/utils';

export function useIndividualBoards(initialBoards: IndividualBoard[] = []) {
  const [boards, setBoards] = useState<IndividualBoard[]>(initialBoards);

  const addBoard = useCallback((board: Omit<IndividualBoard, 'id' | 'boardFeet'>) => {
    const boardFeet = (board.thickness * board.width * board.length) / 12;
    const newBoard: IndividualBoard = {
      ...board,
      id: generateUniqueId('board'),
      boardFeet,
    };
    setBoards((prev) => [...prev, newBoard]);
    return newBoard;
  }, []);

  const removeBoard = useCallback((id: string) => {
    setBoards((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const updateBoard = useCallback((id: string, updates: Partial<IndividualBoard>) => {
    setBoards((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const updated = { ...b, ...updates };
          // Recalculate board feet if dimensions changed
          if (updates.thickness !== undefined || updates.width !== undefined || updates.length !== undefined) {
            updated.boardFeet = (updated.thickness * updated.width * updated.length) / 12;
          }
          return updated;
        }
        return b;
      })
    );
  }, []);

  const getTotalBoardFeet = useCallback(() => {
    return boards.reduce((sum, b) => sum + b.boardFeet, 0);
  }, [boards]);

  const clearBoards = useCallback(() => {
    setBoards([]);
  }, []);

  return {
    boards,
    addBoard,
    removeBoard,
    updateBoard,
    getTotalBoardFeet: getTotalBoardFeet(),
    boardCount: boards.length,
    clearBoards,
    setBoards,
  };
}

