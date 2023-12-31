import { MessageCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Header } from '../components/Header'
import { Module } from '../components/Module'
import { Video } from '../components/Video'
import { useCurrentLesson, useStore } from '../zustand-store'
// import { useAppDispatch, useAppSelector } from '../store'
// import { loadCourse, useCurrentLesson } from '../store/slices/player'

export function Player() {
  const { course, load, isLoading } = useStore(store => ({
    course: store.course,
    load: store.load,
    isLoading: store.isLoading,
  }))

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`
    }
  }, [currentLesson])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          {/** Header */}
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                  <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-700"></div>

                  <div className="flex flex-col gap-1 text-left">
                    <div className="h-5 w-[200px] bg-zinc-700 text-transparent rounded-md" />
                    <div className="h-4 w-[200px] bg-zinc-700 text-transparent rounded-md" />
                  </div>
                </div>
              </div>
            ) : (
              course?.modules &&
              course.modules.map((module, index) => (
                <Module
                  key={module.id}
                  moduleIndex={index}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                />
              ))
            )}
          </aside>
        </main>
      </div>
    </div>
  )
}
