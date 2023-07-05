import { describe, expect, it } from 'vitest'
import { PlayerState, next, play, player as reducer } from './player'

const exampleState: PlayerState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: 'Iniciando com React',
        lessons: [
          {
            id: 'RNj5oxr7xfw',
            title: 'Fundamentos do Redux',
            duration: '09:"12',
          },
          {
            id: 'w-DW4DhDfcw',
            title: 'Estilização do Post',
            duration: '10:05',
          },
        ],
      },
      {
        id: 2,
        title: 'Estrutura da aplicação',
        lessons: [
          {
            id: 'gE48FQXRZ_o',
            title: 'Componente: Comment',
            duration: '13:45',
          },
          { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
        ],
      },
    ],
  },
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  isLoading: false,
}

describe('player slice', () => {
  it('should be able to play', () => {
    const state = reducer(exampleState, play([1, 2]))

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    const state = reducer(exampleState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('should be able to jump to the next module automatically', () => {
    const state = reducer(
      {
        ...exampleState,
        currentLessonIndex: 1,
      },
      next()
    )

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })

  it('should be not update current module and lesson index if there is no next lesson available', () => {
    const state = reducer(
      {
        ...exampleState,
        currentModuleIndex: 1,
        currentLessonIndex: 1,
      },
      next()
    )

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(1)
  })
})
