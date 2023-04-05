import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import Fixture from './src/types/fixture';
import useSWR, { Fetcher } from 'swr'

interface UniverseState {
    name: string,
    mode: string,
    fixtures: Array<Fixture>
    fetchErrors: Array<string>,
    setName: (name: string) => void,
    setMode: (mode: string) => void,
    setFixtures: (fixtures:Array<Fixture>) => void,
    updateFixture: (fixture: Fixture) => void,
    // toggleFixtureState: (on: boolean, fixture: Fixture) => void,
    addFixture: (fixture: Fixture) => void,
    removeFixture: (fixture: Fixture) => void,
    addError: (err : string) => void,
    popError: () => void,
}

const useUniverseState = create<UniverseState>()(
    devtools(
        persist(
            (set) => ({
                name: "",
                mode: "",
                fixtures: [],
                fetchErrors: [],
                setFixtures: (fixtures: Fixture[]) => set({fixtures: fixtures}),
                setName: (name: string) => set({name: name}),
                setMode: (mode: string) => set({mode: mode}),
                updateFixture: (fixture: Fixture) => {
                    set(state => ({
                        fixtures: state.fixtures !== undefined ? state.fixtures.map(f => {
                            return (f.id === fixture.id 
                            ? fixture
                            : f)
                        })
                        : state.fixtures
                    }))
                },
                addFixture: (fixture: Fixture) => {
                    set(state => ({
                        fixtures: state.fixtures !== undefined ? [...state.fixtures, fixture]
                        : state.fixtures
                    }))
                },
                removeFixture: (fixture: Fixture) => {
                    set(state => ({
                        fixtures: state.fixtures !== undefined ? state.fixtures.filter(f => {
                            return f.id !== fixture.id
                        })
                        : state.fixtures
                    }))
                },
                addError: (err: string) => {
                    set(state => ({
                        fetchErrors: [...state.fetchErrors, err]
                    }))
                },
                popError: () => {
                    // set(state => ({
                    //     fetchErrors
                    // }))
                }
            }),
            {
                name: 'universe-storage'
            }
        )
    )
)

export default useUniverseState;