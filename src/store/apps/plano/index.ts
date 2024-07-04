import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type BoardProps = {
  letter: string
  status: string
}

export interface PlanoSliceState {
  loading: boolean
  dictionary: string[]
  secretWord: string
  inputWord: string
  board: BoardProps[][]
  currentRow: number
  gamesPlayed: number
  gamesWon: number
  gameOver: boolean
  error: any
}

const initialState: PlanoSliceState = {
  loading: false,
  dictionary: [],
  secretWord: '',
  inputWord: '',
  board: Array(5).fill(Array(5).fill({ letter: '', status: '' })),
  currentRow: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  gameOver: false,
  error: null
}



export const fetchWords = createAsyncThunk('plano/fetchWords', async (params, { signal }) => {
  const response = await fetch('./filtered-words.json', {
    signal
  })

  const words = await response.json() as string[]

  if (!Array.isArray(words) || words.length === 0) {
    throw new Error('No se pudo cargar la lista de palabras');
  }

  return words
})


export const planoSlice = createSlice({
  name: 'plano',
  initialState,
  reducers: {
    setInputWord: (state, action) => {
      state.inputWord = action.payload
    },
    updateCurrentRow: (state, action) => {
      state.board[state.currentRow] = action.payload
    },
    incrementRow: state => {
      state.currentRow += 1
    },
    resetInputWord: state => {
      state.inputWord = ''
    },
    incrementGamesPlayed: state => {
      state.gamesPlayed += 1
    },
    incrementGamesWon: state => {
      state.gamesWon += 1
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload
    },
    resetGame: state => {
      state.currentRow = 0
      state.board = Array(5).fill(Array(5).fill({ letter: '', status: '' }))
      state.gameOver = false
      state.inputWord = ''
      state.secretWord = selectRandomWord(state.dictionary)
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchWords.pending, state => {
      state.loading = true
    })

    builder.addCase(fetchWords.fulfilled, (state, action) => {
      state.loading = false
      state.dictionary = action.payload
      state.secretWord = selectRandomWord(state.dictionary)
    })

    builder.addCase(fetchWords.rejected, state => {
      state.loading = false
    })
  },

  selectors: {
    selectPlano: state => state,
  }
})

export const { setInputWord, updateCurrentRow, incrementRow, resetInputWord, incrementGamesPlayed, incrementGamesWon, setGameOver, resetGame } = planoSlice.actions
export const { selectPlano } = planoSlice.selectors

function selectRandomWord(words: string[]) {
  let selectedWords = JSON.parse(localStorage.getItem('selectedWords') || '[]') as string[]

  const availableWords = words.filter(palabra => !selectedWords.includes(palabra));

  if (availableWords.length === 0) {
    throw new Error('No quedan palabras disponibles');
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  const randomWord = availableWords[randomIndex];

  selectedWords.push(randomWord);

  localStorage.setItem('selectedWords', JSON.stringify(selectedWords));

  return randomWord;
}
