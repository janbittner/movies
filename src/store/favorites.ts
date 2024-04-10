import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface FavoritesState {
  moviesIds: number[];
  addMovieId: (id: number) => void;
  removeMovieId: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  devtools(
    persist(
      (set) => ({
        moviesIds: [],
        addMovieId: (id) =>
          set((state) =>
            state.moviesIds.includes(id)
              ? state
              : {
                  moviesIds: [...state.moviesIds, id],
                }
          ),
        removeMovieId: (idToRemove) =>
          set((state) => ({
            moviesIds: [...state.moviesIds.filter((id) => id !== idToRemove)],
          })),
      }),
      { name: 'favoritesStore' }
    )
  )
);
